

export enum PositionType {
    Sell,
    Buy
}


interface Trader {
    addOrder(order: Order): void;
    adjustOrderPrices(): void;
}

const randomNumberFromOneTo = (max: number) => Math.floor(Math.random() * max) + 1;

export class BuyTrader implements Trader {
    
    private orderList: Order[] = [];
    private initPrice: number;

    constructor(public readonly id: number, private price: number, private tradeOrderPrice: number) {
        this.initPrice = this.price;
        this.initOrders();
    }

    private initOrders() {
        for (let index = 0; index < 20; index++) {
            const order = new Order(this.price, this.tradeOrderPrice)
            this.orderList.push(order);
            OrderService.buyOrderList.push(order);
        }
    }

    public adjustOrderPrices() {
        this.orderList.forEach(order => {
            const priceAdjustmentNumber = randomNumberFromOneTo(2);

            if (order.filled) {
                if (order.price - priceAdjustmentNumber > 0) {
                    order.price -= priceAdjustmentNumber;
                }
            } else {
                order.price += priceAdjustmentNumber;
            }

        });
    }

    public addOrder(order: Order): void {
        this.orderList.push(order);
        this.price = this.initPrice;
    }

}

export class SellTrader implements Trader {
    
    private orderList: Order[] = [];
    private initPrice: number;

    constructor(public readonly id: number, private price: number, private tradeOrderPrice: number) {
        this.initPrice = this.price;
        this.initOrders();
    }

    private initOrders() {
        for (let index = 0; index < 20; index++) {
            const order = new Order(this.price, this.tradeOrderPrice)
            this.orderList.push(order);
            OrderService.sellOrderList.push(order);
        }
    }

    public adjustOrderPrices() {
        this.orderList.forEach(order => {
            const priceAdjustmentNumber = randomNumberFromOneTo(2);

            if (order.filled) {
                if (order.price - priceAdjustmentNumber > 0) {
                    order.price += priceAdjustmentNumber;
                }
            } else {
                order.price -= priceAdjustmentNumber;
            }

        });
    }

    public addOrder(order: Order): void {
        this.orderList.push(order);
        this.price = this.initPrice;
    }

}

export class Order {

    public filled: boolean = false;
    public filledPrice: number = -1;

    constructor(public price: number, private readonly tradeOrderPrice: number) { }

    public fillOrder(filledPrice: number) {
        this.filledPrice = filledPrice;
        this.filled = true;
        this.price = this.tradeOrderPrice;
    }
}

export class OrderService {
    public static readonly buyOrderList: Order[] = [];
    public static readonly sellOrderList: Order[] = [];

    public static trade(sellOrder: Order, buyOrder: Order, tradePrice: number) {
        sellOrder.fillOrder(tradePrice);
        buyOrder.fillOrder(tradePrice);
    }
}