import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class DBTrailInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  @Exclude({ toPlainOnly: true })
  created_date: Date;

  @UpdateDateColumn()
  @Exclude({ toPlainOnly: true })
  updated_date: Date;

  @DeleteDateColumn({ name: 'delete_at' })
  @Exclude({ toPlainOnly: true })
  deleted_At?: Date;

  @Column()
  created_by: string;

}