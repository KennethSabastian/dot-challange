import { Body, Controller, Delete, Get, Put, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from './guards/jwt.guard';
import { Request } from 'express';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { UserService } from './user.service';
import { GetAndUpdateUserResponse } from './responses/get_and_update_user.response';

@ApiTags("User")
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("profile")
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: "Get User Profile", description: "This method will give user property: user_id, username, name, created_at, and updated_at" })
    @ApiOkResponse({type: GetAndUpdateUserResponse,description: "Get User Profile Data"})
    get_profile(@Req() request: Request){
        return request.user;
    }
    @Put("update")
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: "Update User Profile", description: "This method will change the value of user profile from bearer token" })
    @ApiBody({type: UpdateUserDto, description: "This method have 2 optional property:  username, and name" })
    @ApiOkResponse({type: GetAndUpdateUserResponse,description: "Successfully Change User Profile Data"})
    update_profile(@Body() updateUserDto:UpdateUserDto,@Req() request: Request){
        return this.userService.update_user(updateUserDto,request.user);
    }
    @Delete("delete")
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: "Delete User Profile", description: "This method will delete user with id value from bearer token" })
    @ApiOkResponse({description: "Delete Profile Data"})
    delete_user(@Req() request: Request){
        return this.userService.delete_user(request.user["id"]);
    }

}
