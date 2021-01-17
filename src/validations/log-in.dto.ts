import { IsEmail, IsNotEmpty, IsString } from "class-validator";

class LogInDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    public email!: string;

    @IsString()
    @IsNotEmpty()
    public password!: string;
}

export default LogInDto;
