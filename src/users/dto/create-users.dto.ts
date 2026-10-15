import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UsersCreateDto {
    @ApiProperty({
        description: "Nom de l'utilisateur. Il doit être unique.",
        example: 'jean_dupont',
    })
    @IsString()
    @IsNotEmpty()
    name!: string;

    @ApiProperty({
        description: "Mot de passe en clair (8 caractères minimum). Il est haché avant d'être enregistré et n'est jamais retourné par l'API.",
        minLength: 8,
        format: 'password',
        example: 'MotDePasse123!',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password!: string;
}