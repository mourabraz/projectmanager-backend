import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
  JoinColumn,
} from 'typeorm';

import { Project } from '../projects/project.entity';
import { User } from '../users/user.entity';

@Entity('users_projects')
@Index(['userId', 'projectId'], { unique: true })
export class UserProject {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  @PrimaryGeneratedColumn('uuid', { length: 36 })
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'project_id' })
  projectId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.usersProjects, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((type) => Project, (project) => project.usersProjects, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
