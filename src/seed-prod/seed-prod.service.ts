/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LoggerTimer } from 'logger-timer-decorator-for-nestjs';

import { UserRepository } from '../users/user.repository';
import { ProjectRepository } from '../projects/project.repository';
import { UserProjectRepository } from '../users-projects/user-project.repository';
import { TaskRepository } from '../tasks/task.repository';
import { PhotoRepository } from '../users/photo.repository';
import { InvitationRepository } from '../invitations/invitation.repository';
import { TaskStatus } from '../tasks/task-status.enum';
import { StepRepository } from '../steps/step.repository';
import { FiileRepository } from '../fiiles/fiile.repository';

@Injectable()
export class SeedsProdService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(ProjectRepository)
    private projectRepository: ProjectRepository,

    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,

    @InjectRepository(StepRepository)
    private stepRepository: StepRepository,

    @InjectRepository(FiileRepository)
    private fiilesRepository: FiileRepository,

    @InjectRepository(InvitationRepository)
    private invitationsRepository: InvitationRepository,

    @InjectRepository(PhotoRepository)
    private photoRepository: PhotoRepository,

    @InjectRepository(UserProjectRepository)
    private userProjectRepository: UserProjectRepository,
  ) {}

  async init() {
    await Promise.all([
      await this.seedUsers(),
      await this.seedProjects(),
      await this.seedTasks(),
      await this.seedSteps(),
      await this.seedFiiles(),
      await this.seedInvitations(),
      await this.seedPhotos(),
      await this.seedUserProjects(),
    ]);
  }

  @LoggerTimer({
    name: SeedsProdService.name,
    text: 'Seed "users" to database',
    asyncFunc: true,
  })
  private async seedUsers(): Promise<void> {
    const data = [
      {
        id: '8194d8dc-3d72-4cd0-b0d0-63ddd10b6181',
        name: null,
        email: 'carlos@teste.com',
        password:
          '$2a$10$0lxH2TXq7rl/SZUpYdYfhemp.ynw.q9k9Lt22wsOZeqxQgIIzS9ri',
        password_updatedAt: '2020-09-18 13:26:59.342+00',
        createdAt: '2020-08-17 13:26:59.341737+00',
        updatedAt: '2020-09-17 18:26:59.342+00',
      },
      {
        id: '59fb286e-4ecd-4f9b-9f1f-ba95890b3e26',
        name: null,
        email: 'rico@teste.com',
        password:
          '$2a$10$isfcpiCagdf5gWOmnmjX6uIUEoXJO.XPJtgeuAJKgsUbL6PKVAwH.',
        password_updatedAt: '2020-09-18 13:27:28.681+00',
        createdAt: '2020-09-18 13:27:28.680919+00',
        updatedAt: '2020-09-18 13:27:28.681+00',
      },
    ];

    await this.userRepository
      .createQueryBuilder()
      .insert()
      .values(data)
      .execute();
  }

  @LoggerTimer({
    name: SeedsProdService.name,
    text: 'Seed "projects" to database',
    asyncFunc: true,
  })
  private async seedProjects(): Promise<void> {
    const data = [
      {
        id: 'a11413ea-8338-438b-a398-0f042907ff9b',
        name: 'Projecto Pessoal',
        ownerId: '59fb286e-4ecd-4f9b-9f1f-ba95890b3e26',
        archivedAt: null,
        createdAt: '2020-09-18 13:27:45.573137+00',
        updatedAt: '2020-09-18 13:27:45.573137+00',
      },
      {
        id: '4a1b312a-50b3-48f9-9ef0-6d5c2b8b78ae',
        name: 'Implementar o Sistema Zarbbox',
        ownerId: '8194d8dc-3d72-4cd0-b0d0-63ddd10b6181',
        archivedAt: null,
        createdAt: '2020-09-18 13:30:37.259574+00',
        updatedAt: '2020-09-18 13:30:37.259574+00',
      },
    ];

    await this.projectRepository
      .createQueryBuilder()
      .insert()
      .values(data)
      .execute();
  }

  @LoggerTimer({
    name: SeedsProdService.name,
    text: 'Seed "tasks" to database',
    asyncFunc: true,
  })
  private async seedTasks(): Promise<void> {
    const data = [
      {
        id: '3e4eb7e5-f68e-410b-9366-106390fe3b33',
        title: 'Fazer um Bolo de Chcolate',
        order: 1,
        description:
          '<p>Compras: </p><ul><li>farinha</li><li>ovos</li><li>açucar</li><li>leite</li></ul>',
        startedAt: null,
        deadlineAt: null,
        completedAt: null,
        status: TaskStatus.OPEN,
        projectId: 'a11413ea-8338-438b-a398-0f042907ff9b',
        ownerId: '59fb286e-4ecd-4f9b-9f1f-ba95890b3e26',
        createdAt: '2020-09-18 13:28:44.991213+00',
        updatedAt: '2020-09-18 13:28:44.991213+00',
      },
      {
        id: '3b61911d-8add-4d0c-a661-15dc69fe0ef0',
        title: 'Assistir ao episódio final do Chaves',
        order: 1,
        description: '<p>Onde que vou ver isso?</p>',
        startedAt: null,
        deadlineAt: null,
        completedAt: null,
        status: TaskStatus.ABANDONED,
        projectId: 'a11413ea-8338-438b-a398-0f042907ff9b',
        ownerId: '59fb286e-4ecd-4f9b-9f1f-ba95890b3e26',
        createdAt: '2020-09-18 13:29:06.151878+00',
        updatedAt: '2020-09-18 13:29:10.246464+00',
      },
      {
        id: 'b5d0e5a6-6eca-4544-a51f-c180ff0db1a5',
        title: 'Desenolver o Frontend',
        order: 1,
        description:
          '<p>Utilizar o React para a implementação do frontend.</p>',
        startedAt: null,
        deadlineAt: null,
        completedAt: null,
        status: TaskStatus.OPEN,
        projectId: '4a1b312a-50b3-48f9-9ef0-6d5c2b8b78ae',
        ownerId: '8194d8dc-3d72-4cd0-b0d0-63ddd10b6181',
        createdAt: '2020-09-18 13:31:10.264304+00',
        updatedAt: '2020-09-18 13:31:10.264304+00',
      },
      {
        id: 'd3933ab8-c280-4b86-8973-45a9b9634a58',
        title: 'Estabelecer as metas de marketing',
        order: 1,
        description: '<p>Listar as targets do markting de lançamento!</p>',
        startedAt: '2020-09-18 13:33:02.247+00',
        deadlineAt: '2020-09-23 23:00:00+00',
        completedAt: null,
        status: TaskStatus.ABANDONED,
        projectId: '4a1b312a-50b3-48f9-9ef0-6d5c2b8b78ae',
        ownerId: '8194d8dc-3d72-4cd0-b0d0-63ddd10b6181',
        createdAt: '2020-09-18 13:32:55.120584+00',
        updatedAt: '2020-09-18 13:33:20.600989+00',
      },
      {
        id: '1a9d67f3-4ffa-4685-a899-2ede757b8d9c',
        title: 'Desenvolver o Backend',
        order: 1,
        description:
          '<p>Usar o framework <s>Nextjs oops</s> NestJS.</p><p></p><p><strong>Boa Sorte;</strong></p>',
        startedAt: '2020-09-18 13:33:13.966+00',
        deadlineAt: '2020-09-30 23:00:00+00',
        completedAt: null,
        status: TaskStatus.IN_PROGRESS,
        projectId: '4a1b312a-50b3-48f9-9ef0-6d5c2b8b78ae',
        ownerId: '8194d8dc-3d72-4cd0-b0d0-63ddd10b6181',
        createdAt: '2020-09-18 13:32:09.63154+00',
        updatedAt: '2020-09-18 13:33:20.616795+00',
      },
    ];

    await this.taskRepository
      .createQueryBuilder()
      .insert()
      .values(data)
      .execute();
  }

  @LoggerTimer({
    name: SeedsProdService.name,
    text: 'Seed "steps" to database',
    asyncFunc: true,
  })
  private async seedSteps(): Promise<void> {
    const data = [
      {
        id: '1cd224bf-42f5-48e6-9706-2601249c650c',
        title: 'Arrumar a TV',
        description: '',
        order: 1,
        startedAt: '2020-09-18 13:29:33.093+00',
        completedAt: '2020-09-18 13:29:41.605+00',
        taskId: '3b61911d-8add-4d0c-a661-15dc69fe0ef0',
        ownerId: '59fb286e-4ecd-4f9b-9f1f-ba95890b3e26',
        createdAt: '2020-09-18 13:29:33.093477+00',
        updatedAt: '2020-09-18 13:29:41.611214+00',
      },
      {
        id: 'e09086c4-2a50-4b1d-994b-ad69060d5d9a',
        title: 'COmprar o DVD do Cahves',
        description: '',
        order: 3,
        startedAt: '2020-09-18 13:29:51.762+00',
        completedAt: null,
        taskId: '3b61911d-8add-4d0c-a661-15dc69fe0ef0',
        ownerId: '59fb286e-4ecd-4f9b-9f1f-ba95890b3e26',
        createdAt: '2020-09-18 13:29:51.761501+00',
        updatedAt: '2020-09-18 13:29:51.761501+00',
      },
      {
        id: '6bbd376b-9296-4c4b-bd69-42eb44477ba7',
        title: 'Arrumar o DVD',
        description: '',
        order: 2,
        startedAt: '2020-09-18 13:29:39.403+00',
        completedAt: '2020-09-18 13:29:54.177+00',
        taskId: '3b61911d-8add-4d0c-a661-15dc69fe0ef0',
        ownerId: '59fb286e-4ecd-4f9b-9f1f-ba95890b3e26',
        createdAt: '2020-09-18 13:29:39.402648+00',
        updatedAt: '2020-09-18 13:29:54.177711+00',
      },
    ];

    await this.stepRepository
      .createQueryBuilder()
      .insert()
      .values(data)
      .execute();
  }

  @LoggerTimer({
    name: SeedsProdService.name,
    text: 'Seed "fiiles" to database',
    asyncFunc: true,
  })
  private async seedFiiles(): Promise<void> {
    const data = [
      {
        id: '406202e6-0e19-472b-9b37-1dafa879d48f',
        name: 'chaves.jpeg',
        type: 'IMAGE' as 'IMAGE',
        path: 'e4cf6e31e6c350b5bc599dab3ed5f2c9.jpeg',
        size: 12023,
        userId: '59fb286e-4ecd-4f9b-9f1f-ba95890b3e26',
        projectId: null,
        taskId: '3b61911d-8add-4d0c-a661-15dc69fe0ef0',
        stepId: null,
        createdAt: '2020-09-18 13:29:21.265938+00',
        updatedAt: '2020-09-18 13:29:21.265938+00',
      },
    ];

    await this.fiilesRepository
      .createQueryBuilder()
      .insert()
      .values(data)
      .execute();
  }

  @LoggerTimer({
    name: SeedsProdService.name,
    text: 'Seed "invitations" to database',
    asyncFunc: true,
  })
  private async seedInvitations(): Promise<void> {
    const data = [
      {
        id: 'e093a1e2-f42d-44ea-8627-42133a52c989',
        emailTo: 'rico@teste.com',
        projectId: '4a1b312a-50b3-48f9-9ef0-6d5c2b8b78ae',
        userId: '8194d8dc-3d72-4cd0-b0d0-63ddd10b6181',
        acceptedAt: '2020-09-18 13:33:59.901+00',
        createdAt: '2020-09-18 13:33:34.710903+00',
        updatedAt: '2020-09-18 13:33:59.904775+00',
      },
    ];

    await this.invitationsRepository
      .createQueryBuilder()
      .insert()
      .values(data)
      .execute();
  }

  @LoggerTimer({
    name: SeedsProdService.name,
    text: 'Seed "photos" to database',
    asyncFunc: true,
  })
  private async seedPhotos(): Promise<void> {
    const data = [
      {
        id: '1daca0c7-ee14-4164-a4a3-cb16dd342572',
        name: 'carlos-256x300.png',
        filename: '66cdbf87703e0219b915b19eae43c42e.png',
        userId: '8194d8dc-3d72-4cd0-b0d0-63ddd10b6181',
        createdAt: '2020-09-18 13:34:57.868044+00',
        updatedAt: '2020-09-18 13:34:57.868044+00',
      },
    ];

    await this.photoRepository
      .createQueryBuilder()
      .insert()
      .values(data)
      .execute();
  }

  @LoggerTimer({
    name: SeedsProdService.name,
    text: 'Seed "userProjects" to database',
    asyncFunc: true,
  })
  private async seedUserProjects(): Promise<void> {
    const data = [
      {
        id: '8403a097-8cc6-4c76-8b59-6189dd0701a9',
        userId: '59fb286e-4ecd-4f9b-9f1f-ba95890b3e26',
        projectId: 'a11413ea-8338-438b-a398-0f042907ff9b',
        createdAt: '2020-09-18 13:27:45.590272+00',
        updatedAt: '2020-09-18 13:27:45.590272+00',
      },
      {
        id: '98966e6d-e4dd-4ba7-bcbd-c4ad416c12e4',
        userId: '8194d8dc-3d72-4cd0-b0d0-63ddd10b6181',
        projectId: '4a1b312a-50b3-48f9-9ef0-6d5c2b8b78ae',
        createdAt: '2020-09-18 13:30:37.268745+00',
        updatedAt: '2020-09-18 13:30:37.268745+00',
      },
      {
        id: '1f7277d8-c658-48fb-b4e2-9e89b8ef810d',
        userId: '59fb286e-4ecd-4f9b-9f1f-ba95890b3e26',
        projectId: '4a1b312a-50b3-48f9-9ef0-6d5c2b8b78ae',
        createdAt: '2020-09-18 13:33:59.919699+00',
        updatedAt: '2020-09-18 13:33:59.919699+00',
      },
    ];

    await this.userProjectRepository
      .createQueryBuilder()
      .insert()
      .values(data)
      .execute();
  }
}
