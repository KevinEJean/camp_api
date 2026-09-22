import * as fs from 'fs';

export default class DatabaseGenerator {

    pathRatings: string;
    pathLocations: string;

    setup() {
        fs.mkdirSync('./src/data', { recursive: true });

        if (!fs.existsSync(this.pathLocations)) {
            fs.writeFileSync(this.pathLocations, JSON.stringify({ locations: {} }, null, 2), 'utf8');
        }

        if (!fs.existsSync(this.pathRatings)) {
            fs.writeFileSync(this.pathRatings, JSON.stringify({ ratings: {} }, null, 2), 'utf8');
        }
    }

    constructor() {
        this.pathLocations = process.env.DB_LOCATIONS_PATH ?? './src/data/databaseLocations.json';
        this.pathRatings = process.env.DB_RATINGS_PATH ?? './src/data/databaseRatings.json';
    }
}