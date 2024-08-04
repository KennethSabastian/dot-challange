import { ApiProperty } from "@nestjs/swagger";
import { Post } from "src/post/entities/post.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length:60, nullable: false, unique: true})
    username: string;

    @Column({length:60, nullable:false})
    password: string;

    @Column({length: 200})
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}