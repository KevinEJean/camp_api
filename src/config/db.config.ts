import fs from 'fs';

export default class DatabaseGenerator {

    path: string;

    setup() {
        fs.mkdirSync('./src/data', { recursive: true });

        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, '{}', 'utf8');
        }
        this.test()
    }

    test() {
        const dummy_data = {'status' : 'healthy'} // replace with location
        fs.writeFileSync(this.path, JSON.stringify(dummy_data, null, 2));
    }

    constructor() {
        this.path = process.env.DB_PATH ?? './src/data/database.json';
    }
}