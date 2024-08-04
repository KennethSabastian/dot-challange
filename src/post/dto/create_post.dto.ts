import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto{
    @IsNotEmpty()
    @IsString()
    @ApiProperty({default: "title"})
    title: string;
    @IsNotEmpty()
    @IsString()
    @ApiProperty({default: "message"})
    message: string;   
}