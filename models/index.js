// index.js
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('firstproject', 'root', 'Wrongway&786', {
    host: 'localhost',
    logging: false,
    dialect: 'mysql'
});

// Export the sequelize instance
module.exports = { sequelize };

// Check database connection
try {
    sequelize.authenticate();
    console.log('DB Connection has been established');
} catch (error) {
    console.error('DB Connection unable:', error);
}

const db = {};
db.Sequelize = Sequelize;  // Fix the typo here
db.sequelize = sequelize;

db.contact = require('./contact')(sequelize, DataTypes);
db.user = require('./user')(sequelize, DataTypes);
db.sequelize.sync({ force: false });  //it will sync , delete prevuous and update new, so make it false,so it wil only update data

module.exports = db;
