"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = exports.Order = void 0;
class Order {
    constructor(price, tradeOrderPrice) {
        this.price = price;
        this.tradeOrderPrice = tradeOrderPrice;
        this.finished = false;
        this.filled = false;
        this.filledPrice = -1;
        this.endPrice = -1;
    }
    fillOrder(filledPrice) {
        // console.log("TRADE filled: " + this.filled + " price: " + filledPrice);
        if (this.filled) {
            this.finished = true;
            this.endPrice = filledPrice;
        }
        else {
            this.filledPrice = filledPrice;
            this.filled = true;
            this.price = this.tradeOrderPrice;
        }
    }
}
exports.Order = Order;
class OrderService {
    static trade(sellOrder, buyOrder, tradePrice, sellIndex, buyIndex) {
        sellOrder.fillOrder(tradePrice);
        buyOrder.fillOrder(tradePrice);
        this.moveFilledOrders(sellOrder, buyOrder, sellIndex, buyIndex);
    }
}
exports.OrderService = OrderService;
OrderService.buyOrderList = [];
OrderService.sellOrderList = [];
OrderService.moveFilledOrders = (sellOrder, buyOrder, sellIndex, buyIndex) => {
    OrderService.sellOrderList.splice(sellIndex, 1);
    OrderService.buyOrderList.splice(buyIndex, 1);
    if (!sellOrder.finished) {
        OrderService.sellOrderList.push(buyOrder);
    }
    if (!buyOrder.finished) {
        OrderService.buyOrderList.push(sellOrder);
    }
};
//# sourceMappingURL=Order.js.map