import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create_post.dto';
import { UserService } from '../user/user.service';
import { UpdatePostDto } from './dto/update_post.dto';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        private readonly userService: UserService
      ) {}
    async create_post(createPostDto:CreatePostDto, user_id:number){
        try{
            const user = await this.userService.find_user_by_id(user_id);
            const newPost = await this.postRepository.create(createPostDto);
            return await this.postRepository.save({...newPost,user:user});
        }catch(error){
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
    async get_post(user_id:number):Promise<Post[]>{
        return await this.postRepository.createQueryBuilder("post").leftJoinAndSelect("post.user","user").where("user.id=:user_id",{user_id:user_id}).getMany();
    }
    async update_post(updatePostDto: UpdatePostDto){
        try{
            const post = await this.postRepository.findOneBy({id:updatePostDto.id})
            if (updatePostDto.title=== undefined) updatePostDto.title = post.title;
            if (updatePostDto.message === undefined) updatePostDto.message = post.message;
            return this.postRepository.save(updatePostDto);
        }catch(error){
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
    async delete_post(id: number):Promise<void>{
        const post = await this.postRepository.findOneBy({id:id});
        this.postRepository.delete(post);

    }
}
