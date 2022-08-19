
import { Auth } from 'src/modules/auth/entities/auth.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('user_transaction')
export class UserTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transaction_type: string;
  @Column()
  coin: string;

  @Column({ type: 'decimal' })
  coin_count: number;

  @ManyToOne(
    type => Auth,
    user_id => user_id,
    { nullable: false },
  )
  @JoinColumn({ name: 'account_id' })
  account_id: string;


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
