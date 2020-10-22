"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = exports.Order = exports.SellTrader = exports.BuyTrader = exports.PositionType = void 0;
var PositionType;
(function (PositionType) {
    PositionType[PositionType["Sell"] = 0] = "Sell";
    PositionType[PositionType["Buy"] = 1] = "Buy";
})(PositionType = exports.PositionType || (exports.PositionType = {}));
const randomNumberFromOneTo = (max) => Math.floor(Math.random() * max) + 1;
class BuyTrader {
    constructor(id, price, tradeOrderPrice) {
        this.id = id;
        this.price = price;
        this.tradeOrderPrice = tradeOrderPrice;
        this.orderList = [];
        this.initPrice = this.price;
        this.initOrders();
    }
    initOrders() {
        for (let index = 0; index < 5; index++) {
            const order = new Order(this, this.price, this.tradeOrderPrice);
            this.orderList.push(order);
            OrderService.buyOrderList.push(order);
        }
    }
    checkOrder(currentPrice) {
    }
    addOrder(order) {
        this.orderList.push(order);
        this.price = this.initPrice;
    }
}
exports.BuyTrader = BuyTrader;
class SellTrader {
    constructor(id, price, tradeOrderPrice) {
        this.id = id;
        this.price = price;
        this.tradeOrderPrice = tradeOrderPrice;
        this.orderList = [];
        this.initPrice = this.price;
        this.initOrders();
    }
    initOrders() {
        for (let index = 0; index < 5; index++) {
            const order = new Order(this, this.price, this.tradeOrderPrice);
            this.orderList.push(order);
            OrderService.sellOrderList.push(order);
        }
    }
    checkOrder(lowestPrice) {
    }
    addOrder(order) {
        this.orderList.push(order);
        this.price = this.initPrice;
    }
}
exports.SellTrader = SellTrader;
class Order {
    constructor(trader, price, tradeOrderPrice) {
        this.trader = trader;
        this.price = price;
        this.tradeOrderPrice = tradeOrderPrice;
        this.filled = false;
        this.filledPrice = -1;
    }
    orderFilled(filledPrice) {
        this.filledPrice = filledPrice;
        this.filled = true;
        this.price = this.tradeOrderPrice;
    }
}
exports.Order = Order;
class OrderService {
    static trade(sellOrder, buyOrder, tradePrice) {
        sellOrder.orderFilled(tradePrice);
        buyOrder.orderFilled(tradePrice);
    }
}
exports.OrderService = OrderService;
OrderService.buyOrderList = [];
OrderService.sellOrderList = [];
//# sourceMappingURL=Trader.js.map