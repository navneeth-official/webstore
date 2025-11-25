import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface catalogue_category{
    catalogueCategoryId: number,
    catalogueId: number,
    catalogueName: string,
    categoryId: number,
    categoryName: string,
    createdAt: string,
    createdBy: string,
    updatedAt: string,
    updatedBy: string
}
@Injectable({
  providedIn: 'root',
})
export class Api3 {
  
  constructor(private http:HttpClient){}

  BASE_URL='http://localhost:8080/api/catalogue-categories'

  getAllCatalogueCategory(){
    return this.http.get<catalogue_category>(this.BASE_URL)
  }

  createCatalogueCategory(catalogueId:number,categoryId:number){
    const body={
      catalogueId:catalogueId,
      categoryId:categoryId
    }
    console.log(body)
    return this.http.post(this.BASE_URL,body)
  }
}
