import { Trader, randomNumberFromOneTo }  from './Trader';
import { OrderService, Order, OrderType } from '../Order';

export class SellTrader extends Trader {

    constructor(id: number, price: number, tradeOrderPrice: number) {
        super(id, price, tradeOrderPrice);
    }

    protected initOrders() {
        for (let index = 0; index < 1; index++) {
            this.addOrder();
        }
    }

    public addOrder() {

        const order = new Order(this.price, this.tradeOrderPrice, OrderType.SELL);
        this.orderList.push(order);
        OrderService.sellOrderList.push(order);
    }

    public adjustOrderPrices() {
        let orderIndex = this.orderList.length;
        while (orderIndex--) {
            const order = this.orderList[orderIndex];
            const priceAdjustmentNumber = randomNumberFromOneTo(5);

            if (order.finished) {
                this.finishedOrderList.push(order);
                this.orderList.splice(orderIndex, 1);
                continue;
            }

            if (order.filled) {
                if (order.price - priceAdjustmentNumber > 0) {
                    order.price += priceAdjustmentNumber;
                }
            } else {
                order.price -= priceAdjustmentNumber;
            }

        }
    }

}