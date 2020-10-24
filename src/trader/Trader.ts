import { Order } from '../Order';

export abstract class Trader {

    protected orderList: Order[] = [];
    protected finishedOrderList: Order[] = [];
    protected initPrice: number;

    constructor(protected readonly id: number, protected price: number, protected tradeOrderPrice: number) {
        this.initPrice = this.price;
        this.initOrders();
    }

    protected abstract initOrders(): void;
    public abstract addOrder(): void
    public abstract adjustOrderPrices(): void;
    
    public calculateWin(): number {
        let win = 0;
        this.finishedOrderList.forEach(order => {
            win += order.calculateWin();
        })
        console.log(this.constructor.name + ": " + win + " number of trades: " + this.finishedOrderList.length);
        return win;
    }
}

export const randomNumberFromOneTo = (max: number) => Math.floor(Math.random() * max) + 1;