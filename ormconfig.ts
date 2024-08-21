// import { DataSource } from "typeorm";

const environment = process.env.NODE_ENV || 'development';

// export default new DataSource({
//     migrationsTableName: 'migrations',
//     type: 'sqlite',
//     database: './src/database/database.sqlite',
//     logging: false,
//     synchronize: false,
//     name: 'default',
//     entities: [`./src/models/*.${environment === 'production' ? 'js' : 'ts'}`],
//     migrations: ['./src/database/migrations'],
//     // subscribers: ['src/subscriber/**/*{.ts,.js}'],
// });

export = {
    type: "sqlite",
    database: "./src/database/database.sqlite",
    migrations: [`./src/database/migrations/*.${environment === 'production' ? 'js' : 'ts'}`],
    entities: [`./src/models/*.${environment === 'production' ? 'js' : 'ts'}`],
    cli: {
        "migrationsDir": "./src/database/migrations"
    }
}