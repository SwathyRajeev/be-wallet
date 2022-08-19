import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('auth')
@Unique(['user_id'])
@Unique(['username'])
export class Auth {
  @PrimaryGeneratedColumn()
  user_id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  update_date: Date;

  @DeleteDateColumn({ name: 'delete_at' })
  deleted_At?: Date;
}
