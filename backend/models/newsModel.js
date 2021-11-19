module.exports = (sequelize, DataTypes) => {
    const News = sequelize.define("news", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        url: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        url_to_image: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        published_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        underscored: true
    })
    return News
}