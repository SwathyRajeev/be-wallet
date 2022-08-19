
import { Auth } from 'src/modules/auth/entities/auth.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('user_location')
export class UserLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ip: string;

  @Column()
  city: string;

  @Column()
  region: string;

  @Column()
  country_name: string;

  @Column()
  timezone: string;

  @Column()
  utc_offset: string;

  @ManyToOne(
    type => Auth,
    user_id => user_id,
    { nullable: false },
  )
  @JoinColumn({ name: 'user_id' })
  user_id: string;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @DeleteDateColumn({ name: 'delete_at' })
  deleted_At?: Date;
}
