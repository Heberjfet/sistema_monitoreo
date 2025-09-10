module.exports = (sequelize, DataTypes) => {
    const Inrows = sequelize.define('Inrows', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fpm: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        temperatura: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        observaciones: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'inrows',
        timestamps: true
    });

    Inrows.associate = (models) => {
        // Define associations here if needed
    };

    return Inrows;
};