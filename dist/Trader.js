"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellTrader = exports.BuyTrader = exports.randomNumberFromOneTo = exports.Trader = void 0;
const Order_1 = require("./Order");
class Trader {
    constructor(id, price, tradeOrderPrice) {
        this.id = id;
        this.price = price;
        this.tradeOrderPrice = tradeOrderPrice;
        this.orderList = [];
        this.finishedOrderList = [];
        this.initPrice = this.price;
        this.initOrders();
    }
    addOrder(order) {
        this.orderList.push(order);
    }
}
exports.Trader = Trader;
exports.randomNumberFromOneTo = (max) => Math.floor(Math.random() * max) + 1;
class BuyTrader extends Trader {
    constructor(id, price, tradeOrderPrice) {
        super(id, price, tradeOrderPrice);
    }
    initOrders() {
        for (let index = 0; index < 10; index++) {
            const order = new Order_1.Order(this.price, this.tradeOrderPrice);
            this.orderList.push(order);
            Order_1.OrderService.buyOrderList.push(order);
        }
    }
    adjustOrderPrices() {
        let orderIndex = this.orderList.length;
        while (orderIndex--) {
            const order = this.orderList[orderIndex];
            const priceAdjustmentNumber = exports.randomNumberFromOneTo(10);
            if (order.finished) {
                this.finishedOrderList.push(order);
                this.orderList.splice(orderIndex, 1);
                continue;
            }
            if (order.filled) {
                if (order.price - priceAdjustmentNumber > 0) {
                    order.price -= priceAdjustmentNumber;
                }
            }
            else {
                order.price += priceAdjustmentNumber;
            }
        }
    }
    calculateWin() {
        let win = 0;
        this.finishedOrderList.forEach(order => {
            win += (order.endPrice - order.filledPrice);
        });
        return win;
    }
}
exports.BuyTrader = BuyTrader;
class SellTrader extends Trader {
    constructor(id, price, tradeOrderPrice) {
        super(id, price, tradeOrderPrice);
    }
    initOrders() {
        for (let index = 0; index < 10; index++) {
            const order = new Order_1.Order(this.price, this.tradeOrderPrice);
            this.orderList.push(order);
            Order_1.OrderService.sellOrderList.push(order);
        }
    }
    adjustOrderPrices() {
        let orderIndex = this.orderList.length;
        while (orderIndex--) {
            const order = this.orderList[orderIndex];
            const priceAdjustmentNumber = exports.randomNumberFromOneTo(10);
            if (order.finished) {
                this.finishedOrderList.push(order);
                this.orderList.splice(orderIndex, 1);
                continue;
            }
            if (order.filled) {
                if (order.price - priceAdjustmentNumber > 0) {
                    order.price += priceAdjustmentNumber;
                }
            }
            else {
                order.price -= priceAdjustmentNumber;
            }
        }
    }
    calculateWin() {
        let win = 0;
        this.finishedOrderList.forEach(order => {
            win += (order.filledPrice - order.endPrice);
        });
        return win;
    }
}
exports.SellTrader = SellTrader;
//# sourceMappingURL=Trader.js.map