import { IsDate, IsNotEmpty, IsString, Matches } from 'class-validator';
import Util from '../../utils/utils.js';

export class Users {

    @IsString()
    @IsNotEmpty()
    @Matches(/^usr_(\d{2}[A-Z]{4}\d{2})$/)
    _id!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;

    constructor(name: string, password: string) {
        const util = new Util();
        this._id = `usr_01${util.getRandomID(true, 4)}${util.getRandomID(false, 2)}`;
        this.name = name;
        this.password = password;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}