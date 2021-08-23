export class savedStock
{
     stock_symbol? :string;
     username?:string;
     quantity?:number;
	 current_price?:number;

    constructor(stock_symbol:string,username:string,quantity:number,current_price?:number)
    {
        
		this.stock_symbol = stock_symbol;
		this.username = username;
		this.quantity = quantity;
		this.current_price = current_price;
    }
}