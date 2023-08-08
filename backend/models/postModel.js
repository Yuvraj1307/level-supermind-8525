const sequelize =require("sequelize");
const {seq}=require("../config/db");
const { User } = require("./usermodel");

// Define the User model with the required fields
const Post = seq.define('posts', {

    title: {
        type: sequelize.STRING,
        allowNull: false,
    },
    content: {
        type: sequelize.TEXT,
        allowNull: false,
    },
    url: {
    type: sequelize.STRING,
    allowNull: false,
    } ,

    userId:{
       type: sequelize.INTEGER,
       allowNull:false

    } 
  
});


User.hasMany(Post);
Post.belongsTo(User);
// Export the User model for use in other parts of the application
module.exports = { Post };