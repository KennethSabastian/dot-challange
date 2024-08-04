import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../user/entities/user.entity";

export class CreateGetUpdatePostResponse{
    @ApiProperty()
    title: string;
    @ApiProperty()
    message: string;
    @ApiProperty()
    user: User;
}