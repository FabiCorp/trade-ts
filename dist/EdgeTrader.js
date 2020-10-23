"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdgeTrader = void 0;
const Trader_1 = require("./Trader");
const Order_1 = require("./Order");
class EdgeTrader extends Trader_1.Trader {
    constructor(id, price, tradeOrderPrice) {
        super(id, price, tradeOrderPrice);
    }
    initOrders() {
        for (let index = 0; index < 30; index++) {
            const order = new Order_1.Order(this.price, this.tradeOrderPrice);
            this.orderList.push(order);
            Order_1.OrderService.buyOrderList.push(order);
        }
    }
    adjustOrderPrices() {
        let orderIndex = this.orderList.length;
        while (orderIndex--) {
            const order = this.orderList[orderIndex];
            if (order.finished) {
                this.finishedOrderList.push(order);
                this.orderList.splice(orderIndex, 1);
                continue;
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
exports.EdgeTrader = EdgeTrader;
//# sourceMappingURL=EdgeTrader.js.map