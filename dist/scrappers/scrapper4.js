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
exports.miScrapper4 = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const request_promise_1 = __importDefault(require("request-promise"));
function miScrapper4(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = name.split(" ").map(term => encodeURIComponent(term)).join("+");
        const url = 'https://store.steampowered.com/search/?term=';
        const link = url + query;
        const products = [];
        try {
            const $ = yield (0, request_promise_1.default)({
                uri: link,
                transform: body => cheerio_1.default.load(body)
            });
            let contador = 0;
            $('#search_result_container a').each((i, el) => {
                if (contador >= 7) {
                    return false; // Detiene el bucle
                }
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
                contador++;
            });
        }
        catch (error) {
            console.log(error);
        }
        return products;
    });
}
exports.miScrapper4 = miScrapper4;
//# sourceMappingURL=scrapper4.js.map