import Sequelize from 'sequelize';
import {connection} from '../db-conn';

const Area = connection.define('Areas', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    display: {
        type: Sequelize.STRING,
        len: [2, 20],
        allowNull: false,
        trim: true
    },
    description: {
        type: Sequelize.STRING,
        len: [10, 400],
        alllowNull: false,
        trim: true
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'scions',
            key: 'id'
        }
    },
    lastUpdatedBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'scions',
            key: 'id'
        }
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Date.now()
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Date.now()
    }
});