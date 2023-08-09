require("dotenv").config()

// const {Sequelize}=require("sequelize")
// const seq=new Sequelize("rent-a-time",process.env.US,process.env.PAS ,{
//     host: process.env.HOST,
//     dialect:"mysql",
//     "dialectOptions": {
//         "ssl": {
//           "rejectUnauthorized": true,
//         }
//     }
     
// })

// module.exports={ seq}


const {Sequelize} = require('sequelize');

const seq = new Sequelize("levelsupermind","admin","admin123", {
    'host': "database-3.cuiswqxciwmz.us-west-2.rds.amazonaws.com",
    'dialect': 'mysql',
    
})




module.exports = { seq };
