import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from "typeorm";
import Appointment from './modules/appointments/entities/Appointment';
import User from './modules/users/entities/User';

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
    entities: [User, Appointment],
    subscribers: [`${__dirname}/subscriber/**/*{.js,.ts}`],
    migrations: []
});
