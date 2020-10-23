export enum OrderType { SELL, BUY }

export class Order {

    public finished: boolean = false;
    public filled: boolean = false;
    public filledPrice: number = -1;
    public endPrice: number = -1;

    constructor(public price: number, private readonly tradeOrderPrice: number) { }

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
}