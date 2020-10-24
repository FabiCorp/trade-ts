export enum OrderType { SELL, BUY }

Object.defineProperty(Array.prototype, 'shuffle', {
    value: function() {
        for (let i = this.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this[i], this[j]] = [this[j], this[i]];
        }
        return this;
    }
});

export class Order {

    public finished: boolean = false;
    public filled: boolean = false;
    public filledPrice: number = -1;
    public endPrice: number = -1;

    constructor(public price: number, private readonly tradeOrderPrice: number, private readonly orderType: OrderType) { }

    public fillOrder(filledPrice: number) {
        // console.log("TRADE filled: " + this.filled + " price: " + filledPrice);
        if (this.filled) {
            this.finished = true;
            this.endPrice = filledPrice;
        } else {
            this.filledPrice = filledPrice;
            this.filled = true;
            this.price = this.tradeOrderPrice;
        }
    }

    public calculateWin(): number {

        if (!this.finished) return -1;

        if (this.orderType === OrderType.BUY) {
            return this.endPrice - this.filledPrice;
        } else {
            return this.filledPrice - this.endPrice;
        }
    }
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
*/
const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export class OrderService {
    public static readonly buyOrderList: Order[] = [];
    public static readonly sellOrderList: Order[] = [];

    public static trade(sellOrder: Order, buyOrder: Order, tradePrice: number, sellIndex: number, buyIndex: number) {
        sellOrder.fillOrder(tradePrice);
        buyOrder.fillOrder(tradePrice);
        this.moveFilledOrders(sellOrder, buyOrder, sellIndex, buyIndex);
    }

    private static moveFilledOrders = (sellOrder: Order, buyOrder: Order, sellIndex: number, buyIndex: number) => {
        OrderService.sellOrderList.splice(sellIndex, 1);
        OrderService.buyOrderList.splice(buyIndex, 1);
        if (!sellOrder.finished) {
            OrderService.sellOrderList.push(buyOrder);
        } 
        if (!buyOrder.finished) {
            OrderService.buyOrderList.push(sellOrder);
        } 
    }

    public static shuffleOrderLists() {
        shuffleArray(this.buyOrderList);
        shuffleArray(this.sellOrderList);
    }

    
}