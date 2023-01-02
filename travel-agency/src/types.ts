export type Rate = {
  id : number;
  rate : number;
  
  comment?: string;
  nick?: string;
  orderDate?: Date;
  name? : string;
}

//// CART ////

export type Cart = Map<string, CartItem>

export type CartItem = {
  id : string;
  name: string;
  quantity: number;
  price: number;
}

//// ORDERS ////

export type OrderItem = {
  userId : string,
  tripId : string,
  quantity : number,
  trip? : TripItem
}

export enum OrderStatus {
  Waiting = 'Waiting',
  Active = 'Active',
  Archive = 'Archive'
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
  id : string;
  name: string;
  country: string;
  
  date: TripDate;
  price: number;
  quantity: number;
  
  description: string;
  image: string;
  
  rates?: Rate[]
}

export type CompleteTripItem = {
  id: string;
  name: string;
  country : string;

  date: TripDate;
  price : number;
  quantity : number

  description: string;
  images : string[];
  
  rates? : Rate[]
}


//// AUTH ////

export type LoginProps = {
  email: string;
  password: string;
}

export type RegisterProps = {
  email : string;
  nick : string;
  birthDate : string;
  password: string;
}

export type Tokens = {
  accessToken : string;
  refreshToken : string;
}