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
        for (let index = 0; index < 20; index++) {
            const order = new Order(this.price, this.tradeOrderPrice);
            this.orderList.push(order);
            OrderService.buyOrderList.push(order);
        }
    }
    adjustOrderPrices() {
        this.orderList.forEach(order => {
            const priceAdjustmentNumber = randomNumberFromOneTo(2);
            if (order.filled) {
                if (order.price - priceAdjustmentNumber > 0) {
                    order.price -= priceAdjustmentNumber;
                }
            }
            else {
                order.price += priceAdjustmentNumber;
            }
        });
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
        for (let index = 0; index < 20; index++) {
            const order = new Order(this.price, this.tradeOrderPrice);
            this.orderList.push(order);
            OrderService.sellOrderList.push(order);
        }
    }
    adjustOrderPrices() {
        this.orderList.forEach(order => {
            const priceAdjustmentNumber = randomNumberFromOneTo(2);
            if (order.filled) {
                if (order.price - priceAdjustmentNumber > 0) {
                    order.price += priceAdjustmentNumber;
                }
            }
            else {
                order.price -= priceAdjustmentNumber;
            }
        });
    }
    addOrder(order) {
        this.orderList.push(order);
        this.price = this.initPrice;
    }
}
exports.SellTrader = SellTrader;
class Order {
    constructor(price, tradeOrderPrice) {
        this.price = price;
        this.tradeOrderPrice = tradeOrderPrice;
        this.filled = false;
        this.filledPrice = -1;
    }
    fillOrder(filledPrice) {
        this.filledPrice = filledPrice;
        this.filled = true;
        this.price = this.tradeOrderPrice;
    }
}
exports.Order = Order;
class OrderService {
    static trade(sellOrder, buyOrder, tradePrice) {
        sellOrder.fillOrder(tradePrice);
        buyOrder.fillOrder(tradePrice);
    }
}
exports.OrderService = OrderService;
OrderService.buyOrderList = [];
OrderService.sellOrderList = [];
//# sourceMappingURL=Trader.js.map