"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Trader_1 = require("./Trader");
const Order_1 = require("./Order");
const EdgeTrader_1 = require("./EdgeTrader");
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
for (let index = 0; index < 10; index++) {
    buyerArray[index] = new Trader_1.BuyTrader(index, 30, 70);
}
for (let index = 0; index < 10; index++) {
    sellerArray[index] = new Trader_1.SellTrader(index, 70, 30);
}
const edgeTrader = new EdgeTrader_1.EdgeTrader(0, 45, 55);
// OrderService.sellOrderList.sort((firstOrder , secondOrder) => firstOrder.price < secondOrder.price ? -1 : 1);
// OrderService.buyOrderList.sort((firstOrder , secondOrder) => firstOrder.price < secondOrder.price ? 1 : -1);
const tradeAvailableOrders = () => {
    let sellIndex = Order_1.OrderService.sellOrderList.length;
    while (sellIndex--) {
        const sellOrder = Order_1.OrderService.sellOrderList[sellIndex];
        let buyIndex = Order_1.OrderService.buyOrderList.length;
        while (buyIndex--) {
            const buyOrder = Order_1.OrderService.buyOrderList[buyIndex];
            if (sellOrder.price === buyOrder.price) {
                // console.log("TRADE WITH SAME PRICE: " + sellOrder.price);
                tradeHistory.push(sellOrder.price);
                Order_1.OrderService.trade(sellOrder, buyOrder, sellOrder.price, sellIndex, buyIndex);
                Order_1.OrderService.sellOrderList.splice(sellIndex, 1);
                Order_1.OrderService.buyOrderList.splice(buyIndex, 1);
                break;
            }
            else if (sellOrder.price < buyOrder.price) {
                const midPrice = Math.round((sellOrder.price + buyOrder.price) / 2);
                // console.log("TRADE WITH DIFFERENT PRICES: " + midPrice);
                tradeHistory.push(midPrice);
                Order_1.OrderService.trade(sellOrder, buyOrder, midPrice, sellIndex, buyIndex);
                break;
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
    edgeTrader.adjustOrderPrices();
};
for (let index = 0; index < 20; index++) {
    // console.log("Iteration Nr." + index);
    tradeAvailableOrders();
    adjustAllOrderPrices();
}
console.log(asciichart.plot(tradeHistory));
buyerArray.forEach(buyer => {
    console.log("Buyer: " + buyer.calculateWin());
});
sellerArray.forEach(seller => {
    console.log("Seller: " + seller.calculateWin());
});
console.log("EdgeTrader: " + edgeTrader.calculateWin());
// console.log(OrderService.buyOrderList.length);
//# sourceMappingURL=Application.js.map