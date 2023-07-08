"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.miScrapper5 = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const request_promise_1 = __importDefault(require("request-promise"));
function miScrapper5(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = name.split(" ").map(term => encodeURIComponent(term)).join("+");
        const url = 'https://2game.com/ec/catalogsearch/result/?q=';
        const link = url + query;
        const products = [];
        try {
            const $ = yield (0, request_promise_1.default)({
                uri: link,
                transform: body => cheerio_1.default.load(body)
            });
            let contador = 0;
            $('.product-card').each((i, el) => {
                if (contador >= 7) {
                    return false; // Detiene el bucle
                }
                const nombre = $(el).find('h2 a').text();
                const precioClass = $(el).find('.special-price'); // Obtener todos los precios
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
                contador++;
            });
        }
        catch (error) {
            console.log(error);
        }
        return products;
    });
}
exports.miScrapper5 = miScrapper5;
//# sourceMappingURL=scrapper5.js.map