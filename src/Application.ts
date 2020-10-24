import { TradingInformationService } from './TradingInformationService';
import { DatabaseService, IResponse } from './DatabaseService';
import { IndicatorService } from './IndicatorService';
import { Trader } from './trader/Trader';
import { SellTrader } from './trader/SellTrader';
import { BuyTrader } from './trader/BuyTrader';
import { OrderService, Order } from './Order';
import { EdgeBuyTrader } from './trader/EdgeBuyTrader';
const asciichart = require ('asciichart');

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

const traderList: Trader[] = [];
const tradeHistory: number[] = [ 50 ];

// for (let index = 0; index < 10; index++) {
//     traderList.push(new BuyTrader(index, 30, 70)); 
//     traderList.push(new SellTrader(index, 70, 30));
// }

const tradeAvailableOrders = () => {
    OrderService.shuffleOrderLists()

    let sellIndex = OrderService.sellOrderList.length;
    
    while (sellIndex--) {
        
        const sellOrder: Order = OrderService.sellOrderList[sellIndex];
        
        let buyIndex = OrderService.buyOrderList.length;

        while (buyIndex--) {
            const buyOrder: Order = OrderService.buyOrderList[buyIndex];
    
            if (sellOrder.price === buyOrder.price) {
                // console.log("TRADE WITH SAME PRICE: " + sellOrder.price);
                tradeHistory.push(sellOrder.price);
                OrderService.trade(sellOrder, buyOrder, sellOrder.price, sellIndex, buyIndex);
                OrderService.sellOrderList.splice(sellIndex, 1);
                OrderService.buyOrderList.splice(buyIndex, 1);
                break;
                
            } else if (sellOrder.price < buyOrder.price) {
                const midPrice = Math.round((sellOrder.price + buyOrder.price) / 2); 
                // console.log("TRADE WITH DIFFERENT PRICES: " + midPrice);
                tradeHistory.push(midPrice);
                OrderService.trade(sellOrder, buyOrder, midPrice, sellIndex, buyIndex);

                break;
            }  
            
        }
        
    }

}
     

const adjustAllOrderPrices = () => {
    traderList.forEach(trader => {
        trader.adjustOrderPrices();
    })
}

const addBuyTrader= (start: number, end: number) => {
    traderList.push(new BuyTrader(0, start, end)); 

}

const addSellTrader= (start: number, end: number) => {
    traderList.push(new SellTrader(0, start, end));

}

for (let index = 0; index < 100; index++) {
    // console.log("Iteration Nr." + index);
    const lastMarketPrice = tradeHistory[tradeHistory.length - 1];
    if (index < 40) {
        addBuyTrader(lastMarketPrice - 10, lastMarketPrice + 10);
        addSellTrader(lastMarketPrice + 15, lastMarketPrice - 10);
    } else {
        addBuyTrader(lastMarketPrice - 15, lastMarketPrice + 10);
        addSellTrader(lastMarketPrice + 10, lastMarketPrice - 10);
    }
    tradeAvailableOrders();
    adjustAllOrderPrices();

}

console.log(asciichart.plot(tradeHistory));

traderList.forEach(trader => { trader.calculateWin(); })

// console.log(OrderService.buyOrderList.length);


