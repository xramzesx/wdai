export type Rates = {

}

//// CART ////

export type CartItem = {
  id : number;
  name: string;
  quantity: number;
  price: number;
}


//// TRIP LIST ////

export type TripDate = {
  start : Date;
  end: Date;
}

export type TripItem = {
  id : number;
  name: string;
  country: string;
  
  date: TripDate;
  price: number;
  quantity: number;
  
  description: string;
  image: string;
}