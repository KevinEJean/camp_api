import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Public } from '../auth/guard/jwt-auth.guard.js';

@Controller('health')
export class HealthController {

    @Public()
    @Get()
    @ApiOperation({
        summary: "Vérifier l'état de l'API",
        description: "Point d'accès de contrôle de santé pour vérifier que le service API CampusRate est fonctionnel."
    })
    @ApiResponse({
        status: 200,
        description: "L'API est fonctionnelle et opérationnelle.",
        type: String,
        schema: { example: "L'API CampusRate est opérationnelle 🚀" }
    })
    health(): string {
        return "L'API CampusRate est opérationnelle 🚀";
    }
}