"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndicatorService = void 0;
const SMA = require('technicalindicators').SMA;
class IndicatorService {
    constructor() {
        this.calculateSMA = (timeSeries) => SMA.calculate({ period: 8, values: timeSeries });
    }
    static getInstance() {
        if (this.indicatorService === undefined)
            this.indicatorService = new IndicatorService;
        return this.indicatorService;
    }
}
exports.IndicatorService = IndicatorService;
//# sourceMappingURL=IndicatorService.js.map