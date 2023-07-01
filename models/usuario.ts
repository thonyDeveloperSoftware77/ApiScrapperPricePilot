import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Usuario = db.define('Usuario', {
   id: {
    type: DataTypes.STRING,
    primaryKey: true,
    autoIncrement: false,
    allowNull: false,
  }, 
  nombre: {
    type: DataTypes.STRING
  },
  fechaNacimiento: {
    type: DataTypes.DATE
  },
  email: {
    type: DataTypes.STRING
  },
}, {
  timestamps: false // desactivar la generación automática de createdAt y updatedAt
});


export  default Usuario;