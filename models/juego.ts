import { DataTypes } from 'sequelize';
import db from '../db/connection';


const Juego = db.define('Juego', {
   id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  }, 
  nombre: {
    type: DataTypes.STRING
  },
  precio: {
    type: DataTypes.FLOAT
  },
  image: {
    type: DataTypes.STRING
  },
  link: {
    type: DataTypes.STRING
  },
  page: {
    type: DataTypes.STRING
  },


}, {
  timestamps: false // desactivar la generación automática de createdAt y updatedAt
}
);


export default Juego;