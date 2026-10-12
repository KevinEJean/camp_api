import { registerAs } from '@nestjs/config';

export default registerAs('locationsDB', () => ({
    uri: process.env.MONGO_URI,
}));