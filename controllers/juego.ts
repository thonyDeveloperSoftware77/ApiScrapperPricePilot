import { Request, Response } from "express"
import Juego from "../models/juego";
import { Op } from "sequelize";
import { miScrapper } from "../scrappers/scrapper2";
import { miScrapper3 } from "../scrappers/scrapper3";
import { miScrapper4 } from "../scrappers/scrapper4";
import { miScrapper5 } from "../scrappers/scrapper5";


export const getJuegos = async (req: Request, res: Response) => {

    const Juegos = await Juego.findAll();

    res.json({ Juegos })
}

export const getJuegoNombre = async (req: Request, res: Response) => {

    const { nombre } = req.params;

    //BUSQUE EN SCRAPPER 2
    // Llamar al scrapper para obtener la información del juego
    const juegosScrapper2 = await miScrapper(nombre);

    
     if (juegosScrapper2) {
         // Iterar sobre el arreglo de juegos obtenidos del scrapper
         for (const juegoScrapper of juegosScrapper2) {
             console.log(juegoScrapper);
             // Verificar si el juego obtenido del scrapper ya existe en la base de datos
             const juegoExistente = await Juego.findOne({ where: { nombre: juegoScrapper.nombre } });
             if (!juegoExistente) {
                 // Si el juego no existe en la base de datos, hacer un post con la información obtenida del scrapper
                 try {
                    const juego = await Juego.build(juegoScrapper);
                     await juego.save();
                 } catch (error) {
                     console.log(error);
                     throw new Error('Error al guardar el juego en la base de datos');
                 }
             }
         }
     }

    
        //BUSQUEDA EN SCRAPPER 3
    
         // Llamar al scrapper para obtener la información del juego
         const juegosScrapper3 = await miScrapper3(nombre);
        if (juegosScrapper3) {
            // Iterar sobre el arreglo de juegos obtenidos del scrapper
            for (const juegoScrapper of juegosScrapper3) {
                console.log(juegoScrapper);
                // Verificar si el juego obtenido del scrapper ya existe en la base de datos
                const juegoExistente = await Juego.findOne({ where: { nombre: juegoScrapper.nombre } });
                if (!juegoExistente) {
                    // Si el juego no existe en la base de datos, hacer un post con la información obtenida del scrapper
                    try {
                       const juego = await Juego.build(juegoScrapper);
                        await juego.save();
                    } catch (error) {
                        console.log(error);
                        throw new Error('Error al guardar el juego en la base de datos');
                    }
                }
            }
        }
    
   
    //BUSQUEDA EN SCRAPPER 4
    // Llamar al scrapper para obtener la información del juego
    const juegosScrapper4 = await miScrapper4(nombre);
    if (juegosScrapper4) {
        // Iterar sobre el arreglo de juegos obtenidos del scrapper
        for (const juegoScrapper of juegosScrapper4) {
            console.log(juegoScrapper);
            // Verificar si el juego obtenido del scrapper ya existe en la base de datos
            const juegoExistente = await Juego.findOne({ where: { nombre: juegoScrapper.nombre } });
            if (!juegoExistente) {
                // Si el juego no existe en la base de datos, hacer un post con la información obtenida del scrapper
                try {
                    const juego = await Juego.build(juegoScrapper);
                    await juego.save();
                } catch (error) {
                    console.log(error);
                    throw new Error('Error al guardar el juego en la base de datos');
                }
            }
        }
    }

    //BUSQUEDA EN SCRAPPER 5
    // Llamar al scrapper para obtener la información del juego
    const juegosScrapper5 = await miScrapper5(nombre);
    if (juegosScrapper5) {
        // Iterar sobre el arreglo de juegos obtenidos del scrapper
        for (const juegoScrapper of juegosScrapper5) {
            console.log(juegoScrapper);
            // Verificar si el juego obtenido del scrapper ya existe en la base de datos
            const juegoExistente = await Juego.findOne({ where: { nombre: juegoScrapper.nombre } });
            if (!juegoExistente) {
                // Si el juego no existe en la base de datos, hacer un post con la información obtenida del scrapper
                try {
                    const juego = await Juego.build(juegoScrapper);
                    await juego.save();
                } catch (error) {
                    console.log(error);
                    throw new Error('Error al guardar el juego en la base de datos');
                }
            }
        }
    }



    const juegos = await Juego.findAll({ where: { nombre: { [Op.like]: '%' + nombre + '%' } } });

    if (juegos) {
        res.json(juegos);
    } else {
        res.status(404).json({
            msg: `No existe un juego con el nombre ${nombre}`
        })
    }
}


export const getJuego = async (req: Request, res: Response) => {

    const { id } = req.params;
    const juego = await Juego.findByPk(id);

    if (juego) {
        res.json(juego);
    } else {
        res.status(404).json({
            msg: `No existe un juego con el id ${id}`
        })
    }
}

export const postJuego = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        if (Array.isArray(body)) {
            // Si el cuerpo de la petición es un array, guardar todos los juegos en la base de datos
            const juegos = await Juego.bulkCreate(body);
            res.json(juegos);
        } else {
            // Si el cuerpo de la petición es un objeto, guardar un solo juego en la base de datos
            const juego = await Juego.build(body);
            await juego.save();
            res.json(juego);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const putJuego = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;


    try {

        const juego = await Juego.findByPk(id);
        if (!juego) {
            return res.status(404).json({
                msg: 'No existe un juego con el id ' + id
            })
        }
        await juego.update(body);
        res.json(juego);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

export const deleteJuego = async (req: Request, res: Response) => {

    const { id } = req.params;
    const juego = await Juego.findByPk(id);

    if (!juego) {
        return res.status(404).json({
            msg: 'No existe un juego con el id ' + id
        })
    }

    await juego.destroy();
    res.json(juego);

}