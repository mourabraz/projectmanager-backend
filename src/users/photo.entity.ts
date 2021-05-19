import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity('photos')
@Index(['filename', 'userId'], { unique: true })
export class Photo {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  @PrimaryGeneratedColumn('uuid', { length: 36 })
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  filename: string;

  @Column({ name: 'user_id' })
  userId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  url?: string;
  urltn?: string;
}
