import Usuario from "./usuario";
import Favoritos from "./favoritos";
import Juego from "./juego";


Usuario.hasOne(Favoritos, {  foreignKey: 'idUsuario' });
Favoritos.belongsTo(Usuario, {  foreignKey: 'idUsuario' });

Favoritos.belongsTo(Juego, { foreignKey: 'idJuego' });
Juego.hasMany(Favoritos, { foreignKey: 'idJuego' });
