import { IsNumber } from 'class-validator';
import { Category, Week } from 'src/enum/accountBook.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class AccountBookDate {
  @IsNumber()
  year: number;

  @IsNumber()
  month: number;

  @IsNumber()
  day: number;
}

@Entity('account_book')
export class AccountBook {
  @PrimaryGeneratedColumn()
  no!: number;

  @Column({ name: 'user_id' })
  userId!: string;

  @Column({ name: 'week', type: 'enum', enum: Week })
  week!: Week;

  @Column({ name: 'category', type: 'enum', enum: Category })
  category!: Category;

  @Column({ name: 'date', type: 'json' })
  date!: AccountBookDate;

  @Column()
  content!: string;

  @Column()
  pay!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date | null;
}
