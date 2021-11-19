module.exports = (sequelize, DataTypes) => {
    
    const Category = sequelize.define("category", {
        category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        underscored: true
    }
    )
    return Category
}