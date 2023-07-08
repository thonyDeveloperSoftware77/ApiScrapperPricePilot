import cheerio from 'cheerio';
import request from 'request-promise';

async function miScrapper3(nombre: string): Promise<any[]> {
  const name = nombre;
  const query = name.split(" ").map(term => encodeURIComponent(term)).join("+");
  const url = 'https://www.gamersgate.com';
  const link = url + '/es/games/?query=' + query;
  const products: any[] = [];
  try {


    const $ = await request({
      uri: link,
      transform: body => cheerio.load(body)
    });
    let contador = 0
    $('.product--item').each((i: any, el: any) => {
      if (contador >= 7) {
        return false; // Detiene el bucle
      }
      const nombre = $(el).attr('data-name');
      const precio = $(el).attr('data-price');
      const image = $(el).find('img').attr('src');
      const link = url + $(el).find('a').attr('href');
      const page = "gamersgate";


      if (precio) {
        if (image != undefined) {
          products.push({
            nombre,
            precio,
            image,
            link,
            page
          });
        }

      }
      contador++
    });
  } catch (error) {
    console.log(error);
  }

  return products;
}

export { miScrapper3 };