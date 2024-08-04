import { Body, Controller, Get, HttpException, Post, Req, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from './guards/local.guard';
import { RegisterDto } from './dto/register.dto';
import { RegisterResponse } from './responses/register.response';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @ApiOperation({ summary: "User log in", description: "Log in using your user credential to get authorization access." })
    @ApiBody({ type: LoginDto, description: "This request body has 2 required properties: 'username' and 'password'." })
    @UseGuards(LocalGuard)
    @Post("login")
    @ApiOkResponse({type: String,description: "Get Login Token"})
    login(@Body() loginDto:LoginDto){
        const user = this.authService.login(loginDto);
        return user;
    }
    @ApiOperation({ summary: "User Register", description: "Register new account." })
    @ApiBody({ type: RegisterDto, description: "This request body has 3 properties: username (unique, required), password (required), name(nullable)" })
    @Post("register")
    @ApiOkResponse({type: RegisterResponse,description: "Successfully Register New Account"})
    register(@Body() registerDto:RegisterDto){
        return this.authService.register(registerDto);
    }
}
