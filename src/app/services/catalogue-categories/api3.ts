import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api3 {
  constructor(private http:HttpClient){}

  BASE_URL='http://localhost:8080/api/catalogue-categories'

  createCatalogueCategory(catalogueId:number,categoryId:number){
    const body={
      catalogueId:catalogueId,
      categoryId:categoryId
    }
    console.log(body)
    return this.http.post(this.BASE_URL,body)
  }
}
