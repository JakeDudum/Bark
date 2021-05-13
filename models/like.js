var Sequelize = require("sequelize");

module.exports = function (sequelize) {
    var Like = sequelize.define("Like", {
    }, {
        timestamps: false
    });

    Like.associate = function (models) {

        Like.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false
            }
        });

        Like.belongsTo(models.Blogger, {
            foreignKey: {
                allowNull: false
            }
        });

    };

    return Like;
};