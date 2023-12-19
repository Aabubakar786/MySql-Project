module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        // Define the attributes of the User model
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
    }, {
        tableName: 'users',
    });
return User;
}
