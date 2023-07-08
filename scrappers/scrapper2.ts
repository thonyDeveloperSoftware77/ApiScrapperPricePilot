import cheerio from 'cheerio';
import request from 'request-promise';


async function miScrapper(nombre: string): Promise<any[]> {
    var name = nombre;
    const query = name.split(" ").map(term => encodeURIComponent(term)).join("%20");
    const url = 'https://www.eneba.com'
    const link = url + "/store/all?text=/" + query + "&enbCampaign=Main%20Search&enbContent=search%20dropdown%20-%20categories&enbMedium=link&enbTerm=";
    const products: any[] = []


    try {


        const $ = await request({
            uri: link,
            transform: body => cheerio.load(body)
        })
        let contador = 0;
        $('.uy1qit').each((i: any, el: any) => {
            if (contador >= 7) {
                return false; // Detiene el bucle
            }
            const nombre = $(el).find('.YLosEL').text()
            const precioString = $(el).find('.L5ErLT').text().replace('€', '');
            const precio = parseFloat(precioString);
            const image = $(el).find('img').attr('src')
            const link = url + $(el).find('.b3POZC .oSVLlh').attr('href')
            const page = "eneba";

            if (precio) {
                if (image != undefined) {

                    products.push({
                        nombre,
                        precio,
                        image,
                        link,
                        page
                    })
                }
            }


            contador++
        })
    } catch (error) {
        console.log(error);
    }

    return products;
}

export { miScrapper };