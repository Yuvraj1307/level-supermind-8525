const sequelize =require("sequelize");
const {seq}=require("../config/db");
const { User } = require("./usermodel");
const { Post } = require("./postModel");





const Comment = seq.define('comments', {

    content: {
        type: sequelize.TEXT,
        allowNull: false,
      },
      userId: {
        type: sequelize.INTEGER,
        allowNull: false,
      },
      postId: {
        type: sequelize.INTEGER,
        allowNull: false,
      },

})


User.hasMany(Comment);
Comment.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

module.exports={Comment}
