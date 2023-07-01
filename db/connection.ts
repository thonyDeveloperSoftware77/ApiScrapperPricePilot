import { Sequelize } from "sequelize";


const db = new Sequelize('Scrapper', 'DatabaseAdmin', 'admin123456',{
    host: 'localhost',
    dialect: 'mssql',
    
});


export default db;