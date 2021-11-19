module.exports = (sequelize, DataTypes) => {
    
    const Location = sequelize.define("location", {
        location_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        country: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        city: {
            type: DataTypes.STRING(60),
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        underscored: true
    }
    )
    return Location
}