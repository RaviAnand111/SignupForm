module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define("profile", {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(10),
            allowNull: false
        }
       
    }, {
        freezeTableName: true,
        timestamps: false,
        underscored: true
    })
    return Profile
}