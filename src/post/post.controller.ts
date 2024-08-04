import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create_post.dto';
import { Request } from 'express';
import { JwtGuard } from '../user/guards/jwt.guard';
import { CreateUserDto } from '../user/dto/create_user.dto';
import { PostService } from './post.service';
import { CreateGetUpdatePostResponse } from './responses/create_get_update_post.response';
import { UpdatePostDto } from './dto/update_post.dto';
import { DeletePostDto } from './dto/delete_post.dto';

@ApiTags("Post")
@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}
    @Post("create")
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: "Create New Post", description: "This method will create new post with user from bearer token as creator" })
    @ApiBody({type: CreatePostDto, description: "This method have 2 required property:  title. and message" })
    @ApiOkResponse({type: CreateGetUpdatePostResponse,description: "Successfully Created New Post"})
    create_post(@Body() createPostDto:CreatePostDto, @Req() request: Request ){
        return this.postService.create_post(createPostDto,request.user["id"])
    }
    @Get("post")
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: "Get Post By User Id", description: "This method will get all the post created by the user from bearer token" })
    @ApiOkResponse({type: CreateGetUpdatePostResponse,description: "Successfully Get All Post Data",isArray: true})
    get_post( @Req() request: Request ){
        return this.postService.get_post(request.user["id"])
    }
    @Put("update")
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: "Update Post By Post Id", description: "This method will update post with id from response body" })
    @ApiBody({type: CreatePostDto, description: "This method have 3 property: id(required) title(optional). and message(optional)" })
    @ApiOkResponse({type: CreateGetUpdatePostResponse,description: "Successfully Update Post"})
    update_post(@Body() updatePostDto:UpdatePostDto ){
        return this.postService.update_post(updatePostDto);
    }
    @Delete("delete")
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @ApiBody({type: DeletePostDto, description: "This method have 1 property: id(required)" })
    @ApiOperation({ summary: "Delete Post By Post Id", description: "This method will delete post with the same id as the one given in request body" })
    @ApiOkResponse({description: "Successfully Delete Post"})
    deletepost( @Body() deletePostDto:DeletePostDto ){
        return this.postService.delete_post(deletePostDto.id);
    }
}
