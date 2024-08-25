import { DataSource } from 'typeorm';
import StickyNote from './models/StickyNote';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './src/database/database.sqlite',
  synchronize: true,
  entities: [StickyNote],
  migrations: ['./src/database/migrations/*.ts']
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
