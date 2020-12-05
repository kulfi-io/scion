import Sequelize from 'sequelize';
import {connection} from '../db-conn';

const Scion = connection.define('Scions', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    firstname: {
        type: Sequelize.STRING,
        len: [2, 40],
        allowNull: false,
        trim: true
    },
    lastname: {
        type: Sequelize.STRING,
        len: [2, 60],
        alllowNull: false,
        trim: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        len: [2, 60],
        trim: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        len: [8, 40],
        trim: true,
        allowNull: false
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