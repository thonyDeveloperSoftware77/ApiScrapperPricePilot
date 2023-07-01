import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Favoritos = db.define('Favoritos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  idUsuario: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: false, // establecer idUsuario como clave principal
    references: {
      model: 'Usuario',
      key: 'id',
    }
  },
  idJuego: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: false, // establecer idUsuario como clave principal
    references: {
      model: 'Juego',
      key: 'id',
    }
  },
}, {
  tableName: 'Favoritos',
  timestamps: false // desactivar la generación automática de createdAt y updatedAt
});


export default Favoritos;