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

const seq = new Sequelize(process.env.DATABASE_NAME, process.env.US, process.env.PAS, {
    'host': process.env.HOST,
    'dialect': 'mysql',
    
})




module.exports = { seq };