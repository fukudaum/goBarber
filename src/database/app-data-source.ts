import { DataSource } from "typeorm";
import { CreateAppointments1677712461152 } from "./migrations/1677712461152-CreateAppointments";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "gobarber",
    migrations: [CreateAppointments1677712461152]
});
