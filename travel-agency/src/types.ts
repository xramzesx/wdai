export type Rates = {

}

//// CART ////

export type Cart = Map<number, CartItem>

export type CartItem = {
  id : number;
  name: string;
  quantity: number;
  price: number;
}

//// CURRENCY ////

export type Currency = {
  converter: number;
  name: string;
}

export const currencies : Currency[] = [
  { converter: 1, name : "PLN" },
  { converter: 4.44, name : "USD" },
  { converter: 4.68, name : "EUR" },
]

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