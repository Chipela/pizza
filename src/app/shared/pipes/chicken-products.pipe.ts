import { Pipe, PipeTransform } from '@angular/core';
import {productType} from "../../../types/product.type";

@Pipe({
  name: 'chickenProducts'
})
export class ChickenProductsPipe implements PipeTransform {

  transform(products: productType[]): productType[] {
    return products.filter(item => item.title.toLowerCase().includes('кур'));
  }

}
