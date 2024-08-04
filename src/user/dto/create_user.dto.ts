import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    @ApiProperty({default: "username"})
    username: string;
    @IsNotEmpty()
    @IsString()
    @ApiProperty({default: "password"})
    password: string;
    @IsString()
    @ApiProperty({default: "your name"})
    name: string;
}