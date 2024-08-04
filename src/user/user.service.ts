import { Body, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create_user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update_user.dto';
import { endWith } from 'rxjs';
import { request } from 'express';

const salt = 3
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}
    
    async find_user_by_id(id): Promise<User>{
      try{
        return await this.userRepository.findOneBy({id:id});
      }catch(error){
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
    }

    
    async find_user_by_username(username): Promise<User>{
      try{
        return await this.userRepository.findOneBy({username:username});
      }catch(error){
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
    }
    async create_user(createUserDto: CreateUserDto): Promise<User>{
      try{
        const user = await this.find_user_by_username(createUserDto.username);
        if (user) throw new ConflictException("Username Already Exist");
        const new_password = await bcrypt.hash(createUserDto.password,salt);
        return await this.userRepository.save({...createUserDto,password:new_password});
      }catch(error){
        throw new HttpException(error, HttpStatus.BAD_REQUEST);

      }
    }
    async update_user(updateUserDto: UpdateUserDto,user: Express.User): Promise<User> {
      try{ 
        if (updateUserDto.username !==undefined){
          const checkuser = await this.find_user_by_username(updateUserDto.username);
          if (checkuser && checkuser["username"] === updateUserDto.username) throw new ConflictException("Username Already Exist");
        }else{
          updateUserDto.username = user["username"];
        }
        if(updateUserDto.name ===undefined){
          updateUserDto.name = user["name"];
        }
          return await this.userRepository.save({...updateUserDto,id:user["id"]});
      }catch(error){
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
    }
    async delete_user(user_id:number):Promise<void>{
      const user = await this.userRepository.findOneBy({id:user_id});
      await this.userRepository.delete(user);
    }
}
