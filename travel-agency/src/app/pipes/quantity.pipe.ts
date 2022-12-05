import { Pipe, PipeTransform } from '@angular/core';

interface ClassVariant {
  content: string;
  className: string;
}

type ClassVariantKey = keyof ClassVariant

@Pipe({
  name: 'quantity'
})
export class QuantityMaskPipe implements PipeTransform {

  private classVariants : ClassVariant[] = [
    { content : "In stock", className: "available" },
    { content : "Last tickets", className: "last-tickets" },
    { content : "Sold out", className: "" },
  ]

  transform(value: number, ...args: ClassVariantKey[]): any {
        
    const tag : ClassVariantKey = args.length ? args[0] : 'content'
    
    
    if ( value > 5 )
      return this.classVariants[0][tag]
    else if ( value > 0 )
      return this.classVariants[1][tag]
    else
      return this.classVariants[2][tag]

  }

}
