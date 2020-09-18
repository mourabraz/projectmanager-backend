/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

import { LoggerTimer } from 'logger-timer-decorator-for-nestjs';

import { UserRepository } from '../users/user.repository';
import { ProjectRepository } from '../projects/project.repository';
import { UserProjectRepository } from '../users-projects/user-project.repository';
import { TaskRepository } from '../tasks/task.repository';
import { PhotoRepository } from '../users/photo.repository';
import { InvitationRepository } from '../invitations/invitation.repository';

@Injectable()
export class SeedsService {
  private users = [];
  private projects = [];

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(PhotoRepository)
    private photoRepository: PhotoRepository,
    @InjectRepository(ProjectRepository)
    private projectRepository: ProjectRepository,
    @InjectRepository(UserProjectRepository)
    private userProjectRepository: UserProjectRepository,
    @InjectRepository(InvitationRepository)
    private invitationRepository: InvitationRepository,
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async init() {
    await Promise.all([
      await this.cleanDatabase(),
      await this.seedUsers(),
      await this.seedProjects(),
      await this.seedTasks(),
    ]);
  }

  @LoggerTimer({
    name: SeedsService.name,
    text: 'Clean database',
    asyncFunc: true,
  })
  private async cleanDatabase() {
    await Promise.all([
      await this.taskRepository.query(`DELETE FROM tasks;`),
      await this.invitationRepository.query(`DELETE FROM invitations;`),
      await this.userProjectRepository.query(`DELETE FROM users_projects;`),
      await this.projectRepository.query(`DELETE FROM projects;`),
      await this.photoRepository.query(`DELETE FROM photos;`),
      await this.userRepository.query(`DELETE FROM users;`),
    ]);
  }

  @LoggerTimer({
    name: SeedsService.name,
    text: 'Seed "users" to database',
    asyncFunc: true,
  })
  private async seedUsers(): Promise<void> {
    const data = [
      {
        name: 'User1',
        email: 'user1@email.com',
        password: bcrypt.hashSync('12345678', 10),
      },
      {
        name: 'User2',
        email: 'user2@email.com',
        password: bcrypt.hashSync('12345678', 10),
      },
      {
        name: 'User3',
        email: 'user3@email.com',
        password: bcrypt.hashSync('12345678', 10),
      },
    ];

    this.users = this.userRepository.create(data);
    await this.userRepository.save(this.users);

    this.users = await this.userRepository.find();

    const user1 = this.users.filter((u) => u.name === 'User1')[0];
    const user2 = this.users.filter((u) => u.name === 'User2')[0];
    const user3 = this.users.filter((u) => u.name === 'User3')[0];

    const photos = [
      {
        filename: 'https://i.picsum.photos/id/1027/500/500.jpg',
        userId: user1.id,
      },
      {
        filename: 'https://i.picsum.photos/id/237/500/500.jpg',
        userId: user2.id,
      },
      {
        filename: 'https://i.picsum.photos/id/219/500/500.jpg',
        userId: user3.id,
      },
    ];

    await this.photoRepository.save(photos);
  }

  @LoggerTimer({
    name: SeedsService.name,
    text: 'Seed "projects" to database',
    asyncFunc: true,
  })
  private async seedProjects(): Promise<void> {
    const user1 = this.users.filter((u) => u.name === 'User1')[0];
    const user2 = this.users.filter((u) => u.name === 'User2')[0];
    const user3 = this.users.filter((u) => u.name === 'User3')[0];

    const data = [
      {
        name: 'Project1ForUser1',
        ownerId: user1.id,
      },
      {
        name: 'Project2ForUser1',
        ownerId: user1.id,
      },
      {
        name: 'Project3ForUser1WithUser2',
        ownerId: user1.id,
      },
      {
        name: 'Project4ForUser1WithUser3',
        ownerId: user1.id,
      },
      {
        name: 'Project1ForUser2',
        ownerId: user2.id,
      },
      {
        name: 'Project2ForUser2',
        ownerId: user2.id,
      },
      {
        name: 'Project3ForUser2WithUser1',
        ownerId: user2.id,
      },
    ];

    this.projects = this.projectRepository.create(data);

    await this.projectRepository.save(this.projects);

    this.projects = await this.projectRepository.find();

    const usersProjects = this.projects.map((item) => ({
      userId: item.ownerId,
      projectId: item.id,
    }));

    await this.userProjectRepository.save(usersProjects);

    const project3ForUser1WithUser2 = this.projects.filter(
      (item) => item.name === 'Project3ForUser1WithUser2',
    )[0];

    const project4ForUser1WithUser3 = this.projects.filter(
      (item) => item.name === 'Project4ForUser1WithUser3',
    )[0];

    const project3ForUser2WithUser1 = this.projects.filter(
      (item) => item.name === 'Project3ForUser2WithUser1',
    )[0];

    const usersProjectsParticipates = [
      {
        userId: user2.id,
        projectId: project3ForUser1WithUser2.id,
      },
      {
        userId: user3.id,
        projectId: project4ForUser1WithUser3.id,
      },
      {
        userId: user1.id,
        projectId: project3ForUser2WithUser1.id,
      },
    ];

    await this.userProjectRepository.save(usersProjectsParticipates);

    const usersProjectsInvitations = [
      {
        userId: user1.id,
        emailTo: user2.email,
        projectId: project3ForUser1WithUser2.id,
        acceptedAt: new Date(),
      },
      {
        userId: user1.id,
        emailTo: user3.email,
        projectId: project4ForUser1WithUser3.id,
        acceptedAt: new Date(),
      },
      {
        userId: user2.id,
        emailTo: user1.email,
        projectId: project3ForUser2WithUser1.id,
        acceptedAt: new Date(),
      },
    ];

    await this.invitationRepository.save(usersProjectsInvitations);
  }

  @LoggerTimer({
    name: SeedsService.name,
    text: 'Seed "tasks" to database',
    asyncFunc: true,
  })
  private async seedTasks(): Promise<void> {
    // const user1 = this.users.filter((u) => u.name === 'User1')[0];
    // const user2 = this.users.filter((u) => u.name === 'User2')[0];
    // const user3 = this.users.filter((u) => u.name === 'User3')[0];

    const data = this.projects
      .map((item, index) => {
        const temp = [];
        temp.push({
          title: `${item.name}Task${index + 2}`,
          description: `Descrição da ${item.name}Task${index + 2}`,
          status: ['OPEN', 'IN_PROGRESS', 'DONE', 'ABANDONED'][
            Math.floor(Math.random() * 3)
          ],
          projectId: item.id,
          ownerId: item.ownerId,
          order: index + 2,
        });
        temp.push({
          title: `${item.name}Task${(index + 2) * (index + 2)}`,
          description: `Descrição da ${item.name}Task${index + 2}`,
          status: ['OPEN', 'IN_PROGRESS', 'DONE', 'ABANDONED'][
            Math.floor(Math.random() * 4)
          ],
          projectId: item.id,
          ownerId: item.ownerId,
          order: (index + 2) * (index + 2),
        });
        temp.push({
          title: `${item.name}Task${(index + 2) * (index + 2) * (index + 2)}`,
          description: `Descrição da ${item.name}Task${index + 2}`,
          status: ['OPEN', 'IN_PROGRESS', 'DONE', 'ABANDONED'][
            Math.floor(Math.random() * 4)
          ],
          projectId: item.id,
          ownerId: item.ownerId,
          order: (index + 2) * (index + 2) * (index + 2),
        });

        return temp;
      })
      .reduce((acc, val) => acc.concat(val), []);

    await this.taskRepository.save(data);
  }
}
