import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Apis6 {

  constructor(private http:HttpClient){}

  BASE_URL='http://localhost:8080/api/product-price'

  getAllProducts(){
    return this.http.get(this.BASE_URL)
  }

  getProductPriceById(id:number){
    return this.http.get(this.BASE_URL+'/'+id)
  }

  createProductPrice(productId:number,currencyId:number,currencyAmount:number){
    const body={
      productId:productId,
      currencyId:currencyId, //by default keep it as 1 for USD, later create API calls for currency Id creation
      priceAmount:currencyAmount
    }
    console.log(body)
    return this.http.post(this.BASE_URL,body)
  }

  updateProductprice(id:number,currencyAmount:number){
    console.log(id,currencyAmount)
    return this.http.put(this.BASE_URL+'/'+id,currencyAmount)
  }
}
