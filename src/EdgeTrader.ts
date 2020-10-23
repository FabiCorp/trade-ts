import { Trader }  from './Trader';
import { OrderService, Order } from './Order';

export class EdgeTrader extends Trader {

    constructor(id: number, price: number, tradeOrderPrice: number) {
        super(id, price, tradeOrderPrice);
    }

    protected initOrders() {
        for (let index = 0; index < 30; index++) {
            const order = new Order(this.price, this.tradeOrderPrice);
            this.orderList.push(order);
            OrderService.buyOrderList.push(order);
        }
    }

    public adjustOrderPrices() {
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

    public calculateWin(): number {
        let win = 0;

        this.finishedOrderList.forEach(order => {
            win += (order.endPrice - order.filledPrice);
        })
        return win;
    }

}