module.exports=(sequelize,DataTypes)=>{
    
const Contact = sequelize.define('contacts', {
    // Define the attributes of the User model
    parmanent_address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    current_address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});
return Contact;
}
