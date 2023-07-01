import cheerio from 'cheerio';
import request from 'request-promise';

async function miScrapper5(name: string): Promise<any[]> {
  const query = name.split(" ").map(term => encodeURIComponent(term)).join("+");
  const url = 'https://2game.com/ec/catalogsearch/result/?q=';
  const link = url + query;
  const products: any[] = [];

  const $ = await request({
    uri: link,
    transform: body => cheerio.load(body)
  });

  $('.product-card').each((i: any, el: any) => {
    const nombre = $(el).find('h2 a').text();

    const precioClass = $(el).find('.special-price') // Obtener todos los precios
    const precioString = precioClass.find('.price').text(); // Obtener todos los precios
    const precio = parseFloat(precioString.replace(/[^\d.]/g, ''));

    //PARA SACAR EL ID DE LA IMAGEN
    const id = $(el).find('img').attr('id');
    const numbers = id.match(/\d+/g);
    const result = numbers ? numbers.join('') : '';
    const image = "https://images.2game.com/boxshotst/" + result + "_full.jpg";
    const link = $(el).find('a').attr('href');
    const page = "2Game";

    if (nombre != "") {
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
    }
  });

  return products;
}

export { miScrapper5 };