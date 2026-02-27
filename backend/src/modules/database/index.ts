export * from './database.module';
import mongoSchema from './validation/mongo-schema';

// Correcting the export for mongoSchema
export { default as mongoSchema } from './validation/mongo-schema';
