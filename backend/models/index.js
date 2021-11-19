const dbConfig = require('../config/dbConfig.js')

const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialects,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)

sequelize.authenticate()
.then(()=>{
    console.log("connected...")
})
.catch(err =>{
    console.log(err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./userModel.js')(sequelize, DataTypes)
db.admins = require('./adminModel')(sequelize, DataTypes)
db.newss = require('./newsModel')(sequelize, DataTypes)
db.categories = require('./categoryModel')(sequelize, DataTypes)
db.locations = require('./locationModel')(sequelize, DataTypes)
db.sources = require('./sourceModel')(sequelize, DataTypes)

db.admins.hasMany(db.users, {
    foreignKey: 'admin_user_id',
    as: 'user'
})
db.users.belongsTo(db.admins, {
    foreignKey: 'admin_user_id',
    as: 'admin'
})

db.categories.hasMany(db.newss, {
    foreignKey: 'category_id',
    as: 'news'
})
db.newss.belongsTo(db.categories, {
    foreignKey: 'category_id',
    as: 'category'
})

db.locations.hasMany(db.newss, {
    foreignKey: 'location_id',
    as: 'news'
})
db.newss.belongsTo(db.locations, {
    foreignKey: 'location_id',
    as: 'country'
})

db.sources.hasMany(db.newss, {
    foreignKey: 'source_id',
    as: 'news'
})
db.newss.belongsTo(db.sources, {
    foreignKey: 'source_id',
    as: 'source'
})

db.sequelize.sync({ force: false})
.then(()=>{
    console.log('yes re sync done')
})


module.exports = db