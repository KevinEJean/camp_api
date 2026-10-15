import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SigninDto {
    @ApiProperty({
        description: "Nom du nouvel utilisateur. Il doit être unique.",
        example: 'jean_dupont',
    })
    @IsNotEmpty()
    @IsString()
    name!: string;

    @ApiProperty({
        description: 'Mot de passe du nouveau compte (entre 8 et 20 caractères).',
        minLength: 8,
        maxLength: 20,
        format: 'password',
        example: 'MotDePasse123!',
    })
    @IsNotEmpty()
    @MaxLength(20)
    @MinLength(8)
    password!: string;

    @ApiProperty({
        description: 'Confirmation du mot de passe. Doit être identique à `password`.',
        format: 'password',
        example: 'MotDePasse123!',
    })
    @IsNotEmpty()
    passwordConfirmation!: string;
}