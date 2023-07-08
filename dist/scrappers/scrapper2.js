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
exports.miScrapper = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const request_promise_1 = __importDefault(require("request-promise"));
function miScrapper(nombre) {
    return __awaiter(this, void 0, void 0, function* () {
        var name = nombre;
        const query = name.split(" ").map(term => encodeURIComponent(term)).join("%20");
        const url = 'https://www.eneba.com';
        const link = url + "/store/all?text=/" + query + "&enbCampaign=Main%20Search&enbContent=search%20dropdown%20-%20categories&enbMedium=link&enbTerm=";
        const products = [];
        try {
            const $ = yield (0, request_promise_1.default)({
                uri: link,
                transform: body => cheerio_1.default.load(body)
            });
            let contador = 0;
            $('.uy1qit').each((i, el) => {
                if (contador >= 7) {
                    return false; // Detiene el bucle
                }
                const nombre = $(el).find('.YLosEL').text();
                const precioString = $(el).find('.L5ErLT').text().replace('€', '');
                const precio = parseFloat(precioString);
                const image = $(el).find('img').attr('src');
                const link = url + $(el).find('.b3POZC .oSVLlh').attr('href');
                const page = "eneba";
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
                contador++;
            });
        }
        catch (error) {
            console.log(error);
        }
        return products;
    });
}
exports.miScrapper = miScrapper;
//# sourceMappingURL=scrapper2.js.map