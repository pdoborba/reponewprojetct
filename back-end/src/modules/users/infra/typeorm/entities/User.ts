import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { IUser } from '@modules/users/domain/models/IUser';

@Entity('users')
class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  corporate_name: string;

  @Column()
  fantasy_name: string;

  @Column()
  cnpj: number;

  @Column()
  state_registration: number;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    return `${process.env.APP_API_URL}/files/${this.avatar}`;
  }
}

export default User;
