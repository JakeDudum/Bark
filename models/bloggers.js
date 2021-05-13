var Sequelize = require("sequelize");
var bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
    var Blogger = sequelize.define("Blogger", {
        uuid: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            isUnique: true
        },
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            isUnique: true,
            validate: {
                isEmail: true,
                min: 5
            }
        },
        local_pw: {
            type: DataTypes.STRING,
            required: true,
            validate: {
                min: 6
            }
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE

    });

    // methods ======================
    // generating pw hash
    Blogger.generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    };

    // validate pw
    Blogger.prototype.validPassword = function (lpw, password) {
        return bcrypt.compareSync(lpw, password);
    };

    return Blogger;
}