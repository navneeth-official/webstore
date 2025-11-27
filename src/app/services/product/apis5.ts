import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface price {
  productId: number,
  productName: string,
  currencyId: number,
  currencyCode: string,
  currencySymbol: string,
  priceAmount: number,
}

interface catalogueCategory {
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

interface products {
  productId: number,
  imageUrl:string,
  productName: string,
  productDescription: string,
  catalogueCategory: catalogueCategory,
  stock: number
  sellerId: number,
  createdAt: string,
  createdBy: string,
  updatedAt: string,
  updatedBy: string,
  prices: price[]
}

@Injectable({
  providedIn: 'root',
})
export class Apis5 {
  constructor(private http: HttpClient) { }

  BASE_URL = 'http://localhost:8080/api/products'

  getAllProducts() {
    return this.http.get<products[]>(this.BASE_URL)
  }

  getProductById(id: number) {
    return this.http.get(this.BASE_URL + '/' + id)
  }

  createProduct(thumbnail: string, name: string,catalogueCategory:{catalogueId:number,categoryId:number}, stock: number, sellerId: number) {
    const body = {
      imageUrl: thumbnail,
      catalogueId:catalogueCategory.catalogueId,
      categoryId:catalogueCategory.categoryId,
      productName: name,
      stock: stock,
      sellerId: sellerId,
    }
    console.log(body)
    return this.http.post(this.BASE_URL, body)
  }

  updateProduct(id: number, thumbnail: string, name: string,catalogueCategory:{catalogueId:number,categoryId:number}, stock: number, sellerId: number) {

    const body = {
      imageUrl: thumbnail,
      productName: name,
      catalogueId:catalogueCategory.catalogueId,
      categoryId:catalogueCategory.categoryId,
      stock: stock,
      sellerId: sellerId,
    }

    console.log(body)

    return this.http.put(this.BASE_URL + '/' + id, body)
  }

  deleteProduct(id: number) {

    return this.http.delete(this.BASE_URL + '/' + id)

  }

  searchProduct(text:string){
    return this.http.get(this.BASE_URL+'/search?keyword='+text)
  }

}
