import { ApiProperty } from "@nestjs/swagger";

export class RegisterResponse{
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    created_at: Date;
    @ApiProperty()
    updated_at: Date;
}