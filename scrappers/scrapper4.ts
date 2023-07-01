import cheerio from 'cheerio';
import request from 'request-promise';

async function miScrapper4(name: string): Promise<any[]> {
  const query = name.split(" ").map(term => encodeURIComponent(term)).join("+");
  const url = 'https://store.steampowered.com/search/?term=';
  const link = url + query;
  const products: any[] = [];

  const $ = await request({
    uri: link,
    transform: body => cheerio.load(body)
  });

  $('#search_result_container a').each((i: any, el: any) => {
    const nombre = $(el).find('.search_name span').text();
    const precioSinFormato = $(el).find('.search_price').text(); // '\n $69.99 '
    const precioLimpio = precioSinFormato.trim().replace(/\$/g, ''); // '69.99'
    const precio = parseFloat(precioLimpio); // 69.99


    const image = $(el).find('img').attr('src');
    const link = $(el).attr('href');
    const page = "Steam";

    if (nombre != "") {

      //validar que precio no sea NaN
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

export { miScrapper4 };