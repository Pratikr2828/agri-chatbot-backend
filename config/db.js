import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import fs from 'fs';
const config = JSON.parse(fs.readFileSync('config/config.json', 'utf-8'));
dotenv.config();

const mis_bot = new Sequelize(
    config.mis_chatbot_db.database,
    config.mis_chatbot_db.username,
    config.mis_chatbot_db.password,
    {
        host: config.mis_chatbot_db.host,
        dialect: config.mis_chatbot_db.dialect,
        timezone: 'Asia/Kolkata',
        dialectOptions: { timezone: 'Asia/Kolkata', },
    }
);

const checkDatabaseConnection = async (sequelizeInstance, dbName) => {
    try {
        await sequelizeInstance.authenticate();
        console.log(`Connection to ${dbName} has been established successfully.`);
    } catch (error) {
        console.error(`Unable to connect to ${dbName}:`, error);
    }
};

// Check both database connections
checkDatabaseConnection(mis_bot, 'mis_chatbot_db');


export { mis_bot };

