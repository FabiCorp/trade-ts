import { TradingInformationService } from './TradingInformationService';
import { DatabaseService, IResponse } from './DatabaseService';
import { IndicatorService } from './IndicatorService';
import { SellTrader, BuyTrader, OrderService, Order } from './Trader';
import { trace } from 'console';


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

for (let index = 0; index < 5; index++) {
    buyerArray[index] = new BuyTrader(index, 30, 70);    
}

for (let index = 0; index < 5; index++) {
    sellerArray[index] = new SellTrader(index, 70, 30);    
}

OrderService.sellOrderList.sort((firstOrder , secondOrder) => firstOrder.price < secondOrder.price ? 1 : -1);
OrderService.buyOrderList.sort((firstOrder , secondOrder) => firstOrder.price < secondOrder.price ? 1 : -1);

for (let index = 0; index < OrderService.sellOrderList.length; index++) {
    const sellOrder: Order = OrderService.sellOrderList[index];
    if (sellOrder.filled) continue;

    for (let innerIndex = 0; innerIndex < OrderService.buyOrderList.length; innerIndex++) {
        const buyOrder: Order = OrderService.buyOrderList[index];

        if (buyOrder.filled) continue;

        if (sellOrder.price == buyOrder.price) {
            OrderService.trade(sellOrder, buyOrder, sellOrder.price);
            console.log("TRADE");
            
        } else if (sellOrder.price <= buyOrder.price) {
            const midPrice = Math.round((sellOrder.price + buyOrder.price) / 2); 
            OrderService.trade(sellOrder, buyOrder, midPrice);
            console.log("TRADE");
        }  
        
    }
    
}

console.log(OrderService.sellOrderList);


