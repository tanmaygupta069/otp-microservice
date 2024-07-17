module.exports = (Sequelize, DataTypes) => {
    const User = Sequelize.define('userKeys', {
        apiKey: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        isValid: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        tenantEmail: {
            type: DataTypes.STRING,
            allowNull: false,
    }}
    ,
    {
        freezeTableName: true
    })
    return User;
}