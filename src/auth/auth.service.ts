import { Body, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private readonly userService: UserService){}

    // Controller Function
    async login({username,password}:LoginDto){
        try{
        const user = await this.userService.find_user_by_username(username);
        if (!user) return null;
        if (await bcrypt.compare(password,user.password)){
            const {password, ...checkuser} = user;
            return this.jwtService.sign(checkuser);
        }
        return null;
        }catch(error){
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }
    }
    async register({username,password,name}:RegisterDto){
        try{
            return await this.userService.create_user({username,password,name});
        }catch(error){
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }
    }
}
