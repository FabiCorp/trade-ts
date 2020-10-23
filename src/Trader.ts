import { OrderService, Order } from './Order';

export abstract class Trader {

    protected orderList: Order[] = [];
    protected finishedOrderList: Order[] = [];
    protected initPrice: number;

    constructor(protected readonly id: number, protected price: number, protected tradeOrderPrice: number) {
        this.initPrice = this.price;
        this.initOrders();
    }

    public addOrder(order: Order): void {
        this.orderList.push(order);
    }

    protected abstract initOrders(): void;
    abstract adjustOrderPrices(): void;
    abstract calculateWin(): number;
}

export const randomNumberFromOneTo = (max: number) => Math.floor(Math.random() * max) + 1;

export class BuyTrader extends Trader {

    constructor(id: number, price: number, tradeOrderPrice: number) {
        super(id, price, tradeOrderPrice);
    }

    protected initOrders() {
        for (let index = 0; index < 10; index++) {
            const order = new Order(this.price, this.tradeOrderPrice)
            this.orderList.push(order);
            OrderService.buyOrderList.push(order);
        }
    }

    public adjustOrderPrices() {
        let orderIndex = this.orderList.length;
        while (orderIndex--) {
            const order = this.orderList[orderIndex];
            const priceAdjustmentNumber = randomNumberFromOneTo(10);

            if (order.finished) {
                this.finishedOrderList.push(order);
                this.orderList.splice(orderIndex, 1);
                continue;
            }

            if (order.filled) {
                if (order.price - priceAdjustmentNumber > 0) {
                    order.price -= priceAdjustmentNumber;
                }
            } else {
                order.price += priceAdjustmentNumber;
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

export class SellTrader extends Trader {

    constructor(id: number, price: number, tradeOrderPrice: number) {
        super(id, price, tradeOrderPrice);
    }

    protected initOrders() {
        for (let index = 0; index < 10; index++) {
            const order = new Order(this.price, this.tradeOrderPrice)
            this.orderList.push(order);
            OrderService.sellOrderList.push(order);
        }
    }

    public adjustOrderPrices() {
        let orderIndex = this.orderList.length;
        while (orderIndex--) {
            const order = this.orderList[orderIndex];
            const priceAdjustmentNumber = randomNumberFromOneTo(10);

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

    public calculateWin(): number {
        let win = 0;
        this.finishedOrderList.forEach(order => {
            win += (order.filledPrice - order.endPrice);
        })
        return win;
    }

}