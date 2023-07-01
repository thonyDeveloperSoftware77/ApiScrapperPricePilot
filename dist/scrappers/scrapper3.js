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
exports.miScrapper3 = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const request_promise_1 = __importDefault(require("request-promise"));
function miScrapper3(nombre) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = nombre;
        const query = name.split(" ").map(term => encodeURIComponent(term)).join("+");
        const url = 'https://www.gamersgate.com';
        const link = url + '/es/games/?query=' + query;
        const products = [];
        const $ = yield (0, request_promise_1.default)({
            uri: link,
            transform: body => cheerio_1.default.load(body)
        });
        $('.product--item').each((i, el) => {
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
        });
        return products;
    });
}
exports.miScrapper3 = miScrapper3;
//# sourceMappingURL=scrapper3.js.map