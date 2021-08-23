export class stock
{
    stockName:string;
    stockSymbol:string;
    marketCap:string;
    currentPrice:string;
    marketOpenPrice:string;

    constructor(stockName:string,stockSymbol:string,marketCap:string,currentPrice:string,marketOpenPrice:string)
    {
        
		this.stockName = stockName;
		this.stockSymbol = stockSymbol;
		this.marketCap = marketCap;
		this.currentPrice = currentPrice;
		this.marketOpenPrice = marketOpenPrice;
    }
}