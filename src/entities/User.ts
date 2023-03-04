import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text'})
    name: string;

    @Column({ type: 'text'})
    password: string;

    @Column({ type: 'text'})
    email: string;

    @Column('timestamp with time zone')
    createdAt: Date;

    @Column('timestamp with time zone')
    updatedAt: Date;
}

export default User;
