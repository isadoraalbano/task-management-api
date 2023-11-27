const config = () => ({
    application: { port: process.env.APP_PORT },
    database: {
        mysql: {
            host: process.env.MYSQL_HOST,
            username: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            name: process.env.MYSQL_DATABASE,
        },
    },
    auth: {
        secret: process.env.SECRET_KEY_TOKEN,
    },
});
export type AppConfig = typeof config;
export default config;
