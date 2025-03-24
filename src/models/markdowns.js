"use strict";
module.exports = (sequelize, DataTypes) => {
    const Markdown = sequelize.define(
        "Markdown",
        {
            contentHTML: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            contentMarkdown: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
            },
            doctorId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            specialtyId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            clinicId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            tableName: "markdowns",
        }
    );

    Markdown.associate = function (model) {
        Markdown.belongsTo(model.User, {
            foreignKey: "doctorId",
            tagekey: "id",
            as: "doctordata",
        });
    };
    return Markdown;
};
