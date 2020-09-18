import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstMigration1592497490529 implements MigrationInterface {
    name = 'FirstMigration1592497490529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "forgot_passwords" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "token" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_fae740746a897fb3490abb3a55a" UNIQUE ("email"), CONSTRAINT "PK_77477fca961f3f2a49f8fbc3519" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "fiiles_type_enum" AS ENUM('IMAGE', 'VIDEO', 'PDF')`);
        await queryRunner.query(`CREATE TABLE "fiiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying DEFAULT '', "type" "fiiles_type_enum" NOT NULL DEFAULT 'IMAGE', "path" character varying NOT NULL, "size" integer DEFAULT null, "user_id" uuid DEFAULT null, "project_id" uuid DEFAULT null, "task_id" uuid DEFAULT null, "step_id" uuid DEFAULT null, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_19df15ccc319b4303067692193f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "steps" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying DEFAULT '', "order" integer NOT NULL, "started_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT NOW(), "completed_at" TIMESTAMP(3) WITH TIME ZONE DEFAULT null, "task_id" uuid NOT NULL, "user_id" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_65f86ac8996204d11f915f66a5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "tasks_status_enum" AS ENUM('OPEN', 'IN_PROGRESS', 'DONE', 'ABANDONED')`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "order" integer NOT NULL, "description" text DEFAULT '', "started_at" TIMESTAMP(3) WITH TIME ZONE DEFAULT null, "deadline_at" TIMESTAMP(3) WITH TIME ZONE DEFAULT null, "completed_at" TIMESTAMP(3) WITH TIME ZONE DEFAULT null, "status" "tasks_status_enum" NOT NULL DEFAULT 'OPEN', "project_id" uuid NOT NULL, "user_id" uuid, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "project_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_f3d2d1a584f1bbc6a91d7ea5773" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b3d64b8e224db96928732039cc" ON "users_projects" ("user_id", "project_id") `);
        await queryRunner.query(`CREATE TABLE "invitations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email_to" character varying NOT NULL, "project_id" uuid NOT NULL, "user_id" uuid NOT NULL, "accepted_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_5dec98cfdfd562e4ad3648bbb07" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_423b810847746d5a4c6a91223b" ON "invitations" ("email_to", "project_id") `);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "user_id" uuid NOT NULL, "archived_at" TIMESTAMP(3) WITH TIME ZONE DEFAULT null, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d1dd37ea1f0913282db61d27eb" ON "projects" ("name", "user_id") `);
        await queryRunner.query(`CREATE TABLE "photos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "filename" character varying NOT NULL, "user_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "REL_c4404a2ee605249b508c623e68" UNIQUE ("user_id"), CONSTRAINT "PK_5220c45b8e32d49d767b9b3d725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_2fbddb6eb5b3499a93cbec7ff4" ON "photos" ("filename", "user_id") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "password_updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT NOW(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "email" character varying NOT NULL, "user_id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_b25be8cf08bb12e67ba95bfc43a" UNIQUE ("email", "user_id"), CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "fiiles" ADD CONSTRAINT "FK_40d2a6bcf0897b1ff3d30b033ab" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fiiles" ADD CONSTRAINT "FK_c98c6227b7126ecfc5bec1df0d4" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fiiles" ADD CONSTRAINT "FK_744fb3e745b297fed4630df76c5" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fiiles" ADD CONSTRAINT "FK_57fe6d5bf293ada8b52d3af9c47" FOREIGN KEY ("step_id") REFERENCES "steps"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "steps" ADD CONSTRAINT "FK_24821ef09654c69460de905f893" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_9eecdb5b1ed8c7c2a1b392c28d4" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_db55af84c226af9dce09487b61b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_projects" ADD CONSTRAINT "FK_0f280c70a3a6ab7f4cf3c658c4c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_projects" ADD CONSTRAINT "FK_741210c246defe00ed877a98f2a" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invitations" ADD CONSTRAINT "FK_fecdffec754fa4d5cea98709776" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invitations" ADD CONSTRAINT "FK_1462d5db7be95ebcafc9fcdf2e1" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_bd55b203eb9f92b0c8390380010" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_c4404a2ee605249b508c623e68f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_c4404a2ee605249b508c623e68f"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_bd55b203eb9f92b0c8390380010"`);
        await queryRunner.query(`ALTER TABLE "invitations" DROP CONSTRAINT "FK_1462d5db7be95ebcafc9fcdf2e1"`);
        await queryRunner.query(`ALTER TABLE "invitations" DROP CONSTRAINT "FK_fecdffec754fa4d5cea98709776"`);
        await queryRunner.query(`ALTER TABLE "users_projects" DROP CONSTRAINT "FK_741210c246defe00ed877a98f2a"`);
        await queryRunner.query(`ALTER TABLE "users_projects" DROP CONSTRAINT "FK_0f280c70a3a6ab7f4cf3c658c4c"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_db55af84c226af9dce09487b61b"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_9eecdb5b1ed8c7c2a1b392c28d4"`);
        await queryRunner.query(`ALTER TABLE "steps" DROP CONSTRAINT "FK_24821ef09654c69460de905f893"`);
        await queryRunner.query(`ALTER TABLE "fiiles" DROP CONSTRAINT "FK_57fe6d5bf293ada8b52d3af9c47"`);
        await queryRunner.query(`ALTER TABLE "fiiles" DROP CONSTRAINT "FK_744fb3e745b297fed4630df76c5"`);
        await queryRunner.query(`ALTER TABLE "fiiles" DROP CONSTRAINT "FK_c98c6227b7126ecfc5bec1df0d4"`);
        await queryRunner.query(`ALTER TABLE "fiiles" DROP CONSTRAINT "FK_40d2a6bcf0897b1ff3d30b033ab"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "IDX_2fbddb6eb5b3499a93cbec7ff4"`);
        await queryRunner.query(`DROP TABLE "photos"`);
        await queryRunner.query(`DROP INDEX "IDX_d1dd37ea1f0913282db61d27eb"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP INDEX "IDX_423b810847746d5a4c6a91223b"`);
        await queryRunner.query(`DROP TABLE "invitations"`);
        await queryRunner.query(`DROP INDEX "IDX_b3d64b8e224db96928732039cc"`);
        await queryRunner.query(`DROP TABLE "users_projects"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TYPE "tasks_status_enum"`);
        await queryRunner.query(`DROP TABLE "steps"`);
        await queryRunner.query(`DROP TABLE "fiiles"`);
        await queryRunner.query(`DROP TYPE "fiiles_type_enum"`);
        await queryRunner.query(`DROP TABLE "forgot_passwords"`);
    }

}
