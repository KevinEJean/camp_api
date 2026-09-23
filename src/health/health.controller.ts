import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
    @Get()
    health(): string {
        return "CampusRate API is up and running 🚀";
    }
}