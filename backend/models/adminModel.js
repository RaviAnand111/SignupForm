module.exports = (sequelize, DataTypes) => {
    
    const Admin = sequelize.define("admin", {
        user_id: {
            type: DataTypes.STRING(20),
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        underscored: true
    }
    )
    return Admin
}