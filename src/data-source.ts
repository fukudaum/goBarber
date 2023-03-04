import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from "typeorm";
import Appointment from './entities/Appointment';
import { default1677898942399 } from './migrations/1677898942399-default';

const port = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [Appointment],
    subscribers: [`${__dirname}/subscriber/**/*{.js,.ts}`],
    migrations: [default1677898942399]
});
