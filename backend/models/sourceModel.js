module.exports = (sequelize, DataTypes) => {
    
    const Source = sequelize.define("source", {
        source_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        author: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        underscored: true
    }
    )
    return Source
}