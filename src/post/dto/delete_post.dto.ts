import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DeletePostDto{
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({default:1})
    id: number;
}