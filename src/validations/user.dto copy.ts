import { IsEmail, IsNotEmpty, IsString } from "class-validator";

class UserDto {
    @IsString()
    @IsNotEmpty()
    public firstname!: string;

    @IsString()
    @IsNotEmpty()
    public lastname!: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    public email!: string;
}

export default UserDto;
