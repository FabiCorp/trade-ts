import http, { RequestOptions } from "https";

const options = (symbol: string): RequestOptions => { return {
	"method": "GET",
	"hostname": "rapidapi.p.rapidapi.com",
	"port": null,
	"path": "/query?interval=60min&function=TIME_SERIES_INTRADAY&symbol=" + symbol + "&datatype=json&output_size=compact",
	"headers": {
		"x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
		"x-rapidapi-key": "c1a14f833cmsh62627ab4f191309p1d4987jsne74b5fe0a94f",
		"useQueryString": "true"
    }
}};

export class TradingInformationService {

    private static tradingInfoService: TradingInformationService;

    private constructor() { }
    
    public static getInstance() {
        if (this.tradingInfoService === undefined) 
            this.tradingInfoService = new TradingInformationService;
        return this.tradingInfoService;
    }

    public intradayInfoForSymbol(symbol: string, callback: (request: string) => void): void {
        
        const chunks: Uint8Array[] = [];
        let body: Buffer;
        const req = http.request(options(symbol), function (res) {
        
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