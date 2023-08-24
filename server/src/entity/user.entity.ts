import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  no!: number;

  @Column()
  id!: string;

  @Column()
  password!: string;

  @Column()
  nickname!: string;

  @UpdateDateColumn({ name: 'joined_at' })
  joinedAt!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
