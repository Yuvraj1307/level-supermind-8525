const sequelize =require("sequelize");
const {seq}=require("../config/db")
 

// Define the User model with the required fields
const User = seq.define('users', {
  // First name of the user
  name: {
    type: sequelize.STRING,
    allowNull: false,
  },
    
   email: {
    type: sequelize.STRING,
    allowNull: false
  },
   password: {
    type: sequelize.STRING,
    allowNull: false,
  },
   role: {
    type: sequelize.ENUM('admin', 'user'),
    allowNull: false,
    defaultValue: 'user',  
  },
});

 module.exports = { User };