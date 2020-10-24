"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomNumberFromOneTo = exports.Trader = void 0;
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
    calculateWin() {
        let win = 0;
        this.finishedOrderList.forEach(order => {
            win += order.calculateWin();
        });
        console.log(this.constructor.name + ": " + win + " number of trades: " + this.finishedOrderList.length);
        return win;
    }
}
exports.Trader = Trader;
exports.randomNumberFromOneTo = (max) => Math.floor(Math.random() * max) + 1;
//# sourceMappingURL=Trader.js.map