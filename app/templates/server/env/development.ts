/**
 * development config
 * will replace database config if NODE_ENV === 'development'
 */
export const envConfig: any = {
  database: {
    MONGODB_URI: "<%= dbUri %>",
    MONGODB_DB_MAIN: "<%= dbName %>",
  }
};
