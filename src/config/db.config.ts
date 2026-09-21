import * as fs from 'fs';
import { LocationsCreateDto } from '../locations/dto/create-locations.dto.js';

export default class DatabaseGenerator {

    path: string;

    setup() {
        fs.mkdirSync('./src/data', { recursive: true });

        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify({}, null, 2), 'utf8');
        }
    }

    constructor() {
        this.path = process.env.DB_PATH ?? './src/data/database.json';
    }
}