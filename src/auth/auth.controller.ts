import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { Public } from './guard/jwt-auth.guard.js';
import { LoginDto } from './dto/Login.dto.js';
import { SigninDto } from './dto/Signin.dto.js';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) { }

  @Public()
  @Post('login')
  @ApiOperation({
    summary: 'Se connecter',
    description:
      "Route publique (aucun jeton requis). Vérifie le nom et le mot de passe, puis retourne un jeton JWT à envoyer ensuite dans l'en-tête `Authorization: Bearer <jeton>`.",
  })
  @ApiCreatedResponse({
    description: 'Connexion réussie : le jeton JWT est retourné.',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          description: "Jeton JWT d'accès (valide 1 jour).",
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Corps de la requête invalide : nom ou mot de passe manquant.' })
  @ApiUnauthorizedResponse({ description: 'Nom ou mot de passe invalide.' })
  login(@Body() body: LoginDto) {
    return this.auth.login(body);
  }

  @Public()
  @Post('signin')
  @ApiOperation({
    summary: 'Créer un compte',
    description:
      "Route publique (aucun jeton requis). Crée un nouvel utilisateur. Le mot de passe est haché avant d'être enregistré. Une fois le compte créé, utilisez `/auth/login` pour obtenir un jeton.",
  })
  @ApiCreatedResponse({
    description: 'Le compte a été créé.',
    schema: { type: 'boolean', example: true },
  })
  @ApiBadRequestResponse({
    description: 'Les mots de passe ne correspondent pas, ou les données sont invalides (nom manquant, mot de passe hors de la plage de 8 à 20 caractères).',
  })
  @ApiConflictResponse({ description: 'Un utilisateur portant ce nom existe déjà.' })
  signin(@Body() body: SigninDto) {
    return this.auth.signin(body);
  }
}