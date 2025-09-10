module.exports = (sequelize, DataTypes) => {
    const LamparasEmergencia = sequelize.define('LamparasEmergencia', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        funcionamiento: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        lux: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        observaciones: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        tableName: 'lamparas_emergencia',
        timestamps: true,
    });

    return LamparasEmergencia;
};