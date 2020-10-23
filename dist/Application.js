"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Trader_1 = require("./Trader");
const asciichart = require('asciichart');
// const tradingInformationService = TradingInformationService.getInstance();
// const databaseService = DatabaseService.getInstance();
// const indicatorService = IndicatorService.getInstance();
// tradingInformationService.intradayInfoForSymbol('TSLA', databaseService.saveResponse);
// const closeCandleList: number[] = [];
// const responseCallback = (response: IResponse | null) => { 
//     if (response) {
//         const informationJson = JSON.parse(response.information);
//         const timeSeries = informationJson['Time Series (60min)'];
//         for (const candle in timeSeries) {
//             closeCandleList.push(parseFloat(candle['4. close']));
//         }
//         console.log(closeCandleList);
//     }
// }
// databaseService.findResponse(responseCallback);
const buyerArray = [];
const sellerArray = [];
const tradeHistory = [];
for (let index = 0; index < 5; index++) {
    buyerArray[index] = new Trader_1.BuyTrader(index, 30, 70);
}
for (let index = 0; index < 5; index++) {
    sellerArray[index] = new Trader_1.SellTrader(index, 70, 30);
}
Trader_1.OrderService.sellOrderList.sort((firstOrder, secondOrder) => firstOrder.price < secondOrder.price ? 1 : -1);
Trader_1.OrderService.buyOrderList.sort((firstOrder, secondOrder) => firstOrder.price < secondOrder.price ? 1 : -1);
const tradeAvailableOrders = () => {
    for (let index = 0; index < Trader_1.OrderService.sellOrderList.length; index++) {
        const sellOrder = Trader_1.OrderService.sellOrderList[index];
        if (sellOrder.filled)
            continue;
        for (let innerIndex = 0; innerIndex < Trader_1.OrderService.buyOrderList.length; innerIndex++) {
            const buyOrder = Trader_1.OrderService.buyOrderList[index];
            if (buyOrder.filled)
                continue;
            if (sellOrder.price === buyOrder.price) {
                console.log("TRADE WITH SAME PRICE: " + sellOrder.price);
                tradeHistory.push(sellOrder.price);
                Trader_1.OrderService.trade(sellOrder, buyOrder, sellOrder.price);
            }
            else if (sellOrder.price < buyOrder.price) {
                const midPrice = Math.round((sellOrder.price + buyOrder.price) / 2);
                console.log("TRADE WITH DIFFERENT PRICES: " + midPrice);
                tradeHistory.push(midPrice);
                Trader_1.OrderService.trade(sellOrder, buyOrder, midPrice);
            }
        }
    }
};
const adjustAllOrderPrices = () => {
    buyerArray.forEach(buyer => {
        buyer.adjustOrderPrices();
    });
    sellerArray.forEach(seller => {
        seller.adjustOrderPrices();
    });
};
for (let index = 0; index < 20; index++) {
    console.log("Iteration Nr." + index);
    tradeAvailableOrders();
    adjustAllOrderPrices();
}
console.log(asciichart.plot(tradeHistory));
// console.log(OrderService.sellOrderList);
// console.log(OrderService.buyOrderList);
//# sourceMappingURL=Application.js.map