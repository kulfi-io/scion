import Sequelize from 'sequelize';
import {connection} from '../db-conn';

const ScionAuthArea = connection.define('ScionAuthAreas', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    scionTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'scionTypes',
            key: 'id'
        }
    },
    areaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'areas',
            key: 'id'
        }
    },
    scionAuthId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'scionAuthorities',
            key: 'id'
        }
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