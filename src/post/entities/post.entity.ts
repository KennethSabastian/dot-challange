import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm";

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length:200})
    title: string;

    @Column({length:4000})
    message: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ApiProperty({ required: false,title: "Post Creator", description: "User who created this post" })
    @ManyToOne(Type => User, user => user.id,{onDelete:"CASCADE"})
    @JoinColumn({name: "user_id"})
    user: User;
}