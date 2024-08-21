const environment = process.env.NODE_ENV || 'development';

export = {
    type: "sqlite",
    database: "./src/database/database.sqlite",
    migrations: [`./src/database/migrations/*.${environment === 'production' ? 'js' : 'ts'}`],
    entities: [`./src/models/*.${environment === 'production' ? 'js' : 'ts'}`],
    cli: {
        "migrationsDir": "./src/database/migrations"
    }
}