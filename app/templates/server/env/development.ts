/**
 * development config
 * will replace database config if NODE_ENV === 'development'
 */
export const envConfig: any = {
  database: {
    MONGODB_URI: "mongodb://admin:admin1@ds063859.mlab.com:63859/",
    MONGODB_DB_MAIN: "micro-user",
  }
};
