import * as fs from 'fs';
import { resolve } from 'path';
import {
  Injectable,
  BadRequestException,
  Logger,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as Jimp from 'jimp';

import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { Project } from '../projects/project.entity';
import { ProjectsService } from '../projects/projects.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AppConfigService } from '../config/app/config.service';
import { PhotoRepository } from './photo.repository';
import { Photo } from './photo.entity';
import { MulterConfigService } from '../config/multer/config.service';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(PhotoRepository)
    private photoRepository: PhotoRepository,
    private projectsService: ProjectsService,
    private appConfigService: AppConfigService,
    private multerConfigService: MulterConfigService,
  ) {}

  async isUserInProject(user: User, project: Project): Promise<boolean> {
    const projects = await this.projectsService.getProjectsForUser(user);

    return projects.findIndex((i) => i.id === project.id) !== -1;
  }

  async getUserByEmail(email: string): Promise<User> {
    const found = await this.userRepository.findOne({ where: { email } });

    if (!found) {
      this.logger.verbose(`User with email "${email}" not found.`);

      throw new NotFoundException();
    }

    return found;
  }

  async getPhotoByFilename(filename: string): Promise<Photo> {
    const photo = await this.photoRepository.findOne({ where: { filename } });

    if (!photo) {
      this.logger.verbose(`Photo with filename "${filename}" not found.`);

      throw new NotFoundException();
    }

    return photo;
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    user: User,
  ): Promise<User | string> {
    const { email } = updateUserDto;

    if (user.email === 'carlos@teste.com' || user.email === 'rico@teste.com') {
      throw new BadRequestException("This user's account can not be update");
    }

    if (email && email !== user.email) {
      const emailExists = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });

      if (emailExists) {
        throw new BadRequestException('Email already used');
      }
    }

    return await this.userRepository.updateUser(updateUserDto, user);
  }

  async updateUserPhoto(
    file,
    user: User,
  ): Promise<{ url: string; filename: string; id: string }> {
    let photo = await this.photoRepository.findOne({
      where: {
        userId: user.id,
      },
    });

    const prevFilename = photo ? photo.filename : null;

    if (!photo) {
      photo = new Photo();
      photo.userId = user.id;
    }

    try {
      photo.name = file.originalname;
      photo.filename = file.filename;

      await this.photoRepository.save(photo);

      const imageCopy = await Jimp.read(file.path);

      if (imageCopy.bitmap.width > 500) {
        await imageCopy.resize(500, Jimp.AUTO);
      }
      await imageCopy.writeAsync(file.destination + '/tn-' + file.filename);

      if (prevFilename) {
        fs.unlink(
          resolve(this.multerConfigService.uploadPhotoDest, prevFilename),
          async (err) => {
            if (err) {
              this.logger.error(
                `Failed to remove file: "${prevFilename}"`,
                err.stack,
              );
            }
          },
        );
        fs.unlink(
          resolve(
            this.multerConfigService.uploadPhotoDest,
            `tn-${prevFilename}`,
          ),
          async (err) => {
            if (err) {
              this.logger.error(
                `Failed to remove file: "${prevFilename}"`,
                err.stack,
              );
            }
          },
        );
      }

      return {
        url: `${this.appConfigService.url}/users/photo/${photo.filename}`,
        id: photo.id,
        filename: photo.filename,
      };
    } catch (error) {
      this.logger.error(
        `Failed to update user's photo "${user.email}".`,
        error.stack,
      );

      throw new InternalServerErrorException();
    }
  }
}
