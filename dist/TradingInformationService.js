"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradingInformationService = void 0;
const https_1 = __importDefault(require("https"));
const options = (symbol) => {
    return {
        "method": "GET",
        "hostname": "rapidapi.p.rapidapi.com",
        "port": null,
        "path": "/query?interval=60min&function=TIME_SERIES_INTRADAY&symbol=" + symbol + "&datatype=json&output_size=compact",
        "headers": {
            "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
            "x-rapidapi-key": "c1a14f833cmsh62627ab4f191309p1d4987jsne74b5fe0a94f",
            "useQueryString": "true"
        }
    };
};
class TradingInformationService {
    constructor() { }
    static getInstance() {
        if (this.tradingInfoService === undefined)
            this.tradingInfoService = new TradingInformationService;
        return this.tradingInfoService;
    }
    intradayInfoForSymbol(symbol, callback) {
        const chunks = [];
        let body;
        const req = https_1.default.request(options(symbol), function (res) {
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                body = Buffer.concat(chunks);
                callback(body.toString());
            });
        });
        req.end();
    }
}
exports.TradingInformationService = TradingInformationService;
//# sourceMappingURL=TradingInformationService.js.map