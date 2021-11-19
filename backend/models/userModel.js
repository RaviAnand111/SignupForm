module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
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
        f_name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        l_name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING(7),
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
    }, {
        freezeTableName: true,
        timestamps: false,
        underscored: true
    })
    return User
}