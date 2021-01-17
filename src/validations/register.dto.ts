import { IsEmail, IsNotEmpty, IsString } from "class-validator";

class RegisterDto {
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

    @IsString()
    @IsNotEmpty()
    public password!: string;
}

export default RegisterDto;
