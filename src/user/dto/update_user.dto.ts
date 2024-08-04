import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDto{
    @IsOptional()
    @IsString()
    @ApiProperty({default: "username"})
    username: string;
    @IsString()
    @IsOptional()
    @ApiProperty({default: "your name"})
    name: string;
}