/**
 * production config
 * will replace database config if NODE_ENV === 'production'
 */
export const envConfig: any = {
  database: {
    MONGODB_URI: '',
    MONGODB_DB_MAIN: ''
  }
};
