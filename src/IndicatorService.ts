const SMA = require('technicalindicators').SMA;

export class IndicatorService {

    private static indicatorService: IndicatorService;

    private constructor() { }
    
    public static getInstance() {
        if (this.indicatorService === undefined) 
            this.indicatorService = new IndicatorService;
        return this.indicatorService;
    }

    public calculateSMA = (timeSeries: any) => SMA.calculate({ period: 8, values: timeSeries })

    

}