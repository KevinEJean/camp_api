import { Locations } from "../locations/entities/locations.entity.js";
import * as fs from 'fs';

export default class Util {
    public getRandomID(isstring: boolean, len: number): string {
        const chars = isstring ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '0123456789';
        let result = '';
        for (let i = 0; i < len; i++) {
            result += chars.at(Math.floor(Math.random() * chars.length))
        }
        return result;
    }

    public findAllLocations(path: string): Locations[] {
        try {
            const rawData = fs.readFileSync(path, 'utf8');
            const parsed = JSON.parse(rawData);
    
            return Array.isArray(parsed.locations) ? parsed.locations : [];
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}