import { TradingInformationService } from './TradingInformationService';
import { DatabaseService, IResponse } from './DatabaseService';
import { IndicatorService } from './IndicatorService';
import { SellTrader, BuyTrader, OrderService, Order } from './Trader';
import { trace } from 'console';
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

const buyerArray: BuyTrader[] = [];
const sellerArray: SellTrader[] = [];
const tradeHistory: number[] = [];

for (let index = 0; index < 5; index++) {
    buyerArray[index] = new BuyTrader(index, 30, 70);    
}

for (let index = 0; index < 5; index++) {
    sellerArray[index] = new SellTrader(index, 70, 30);    
}

OrderService.sellOrderList.sort((firstOrder , secondOrder) => firstOrder.price < secondOrder.price ? 1 : -1);
OrderService.buyOrderList.sort((firstOrder , secondOrder) => firstOrder.price < secondOrder.price ? 1 : -1);

const tradeAvailableOrders = () => {

    for (let index = 0; index < OrderService.sellOrderList.length; index++) {
        const sellOrder: Order = OrderService.sellOrderList[index];
        if (sellOrder.filled) continue;
    
        for (let innerIndex = 0; innerIndex < OrderService.buyOrderList.length; innerIndex++) {
            const buyOrder: Order = OrderService.buyOrderList[index];
    
            if (buyOrder.filled) continue;
    
            if (sellOrder.price === buyOrder.price) {
                console.log("TRADE WITH SAME PRICE: " + sellOrder.price);
                tradeHistory.push(sellOrder.price);
                OrderService.trade(sellOrder, buyOrder, sellOrder.price);
                
            } else if (sellOrder.price < buyOrder.price) {
                const midPrice = Math.round((sellOrder.price + buyOrder.price) / 2); 
                console.log("TRADE WITH DIFFERENT PRICES: " + midPrice);
                tradeHistory.push(midPrice);
                OrderService.trade(sellOrder, buyOrder, midPrice);
            }  
            
        }
        
    }

}
     

const adjustAllOrderPrices = () => {
    buyerArray.forEach(buyer => {
        buyer.adjustOrderPrices();
    })
    
    sellerArray.forEach(seller => {
        seller.adjustOrderPrices();
    })    
}

for (let index = 0; index < 20; index++) {
    console.log("Iteration Nr." + index);
    
    tradeAvailableOrders();
    adjustAllOrderPrices();
}

console.log(asciichart.plot(tradeHistory));

// console.log(OrderService.sellOrderList);
// console.log(OrderService.buyOrderList);


