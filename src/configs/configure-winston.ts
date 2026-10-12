import { INestApplication } from "@nestjs/common";
import * as winton from "winston";

export function configureWinston(app: INestApplication) {
    const logger = winton.createLogger({
      level: 'info',
      format: winton.format.combine(
        winton.format.timestamp(),
        winton.format.json()
      ),
      transports: [
        new winton.transports.Console(),
        new winton.transports.File({ filename: 'logs/app.log' })
      ]
    });
    app.use((req: any, res: any, next: any) => {
        logger.info(`${req.method} ${req.url}`);
        next();
      });
}