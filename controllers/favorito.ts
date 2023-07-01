import { Request, Response } from "express"
import Favoritos from "../models/favoritos";
import Juego from "../models/juego";

export const getfavoritos = async (req: Request, res: Response) => {
    const { idUsuario } = req.params;
    const favoritos = await Favoritos.findAll({
        where: {
            idUsuario,

        },
        attributes: {
            exclude: ['idUsuario', 'idJuego', 'id']
        },
        include: [{
            model: Juego,
            as: 'Juego'
        }]
    });

    if (favoritos.length > 0) {
        res.json({ favoritos });
    } else {
        res.status(404).json({
            msg: `No existen favoritos para el usuario con el id ${idUsuario}`
        });
    }
}


export const postfavorito = async (req: Request, res: Response) => {


    const { body } = req;
    try {



        const favorito = await Favoritos.build(body);
        await favorito.save();
        res.json(favorito);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })

    }

}

export const putfavorito = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;


    try {

        const favorito = await Favoritos.findByPk(id);
        if (!favorito) {
            return res.status(404).json({
                msg: 'No existe un favorito con el id ' + id
            })
        }
        await favorito.update(body);
        res.json(favorito);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

export const deletefavorito = async (req: Request, res: Response) => {

    const { idJuego } = req.params;
    const favorito = await Favoritos.findByPk(idJuego);

    if (!favorito) {
        return res.status(404).json({
            msg: 'No existe un favorito con el id ' + idJuego
        })
    }

    await favorito.destroy();
    res.json(favorito);
}