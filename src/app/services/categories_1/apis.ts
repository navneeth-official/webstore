import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable } from '@angular/core';

interface catalogue_interface{
  catalogueId:number,
  catalogueName:string,
  catalogueDescription:string
}

interface category_struct {
  categoryId: number,
  categoryName: string,
  categoryDescription: string,
  catalogues: catalogue_interface[],
  productCount: number,
  createdAt: string,
  createdBy:string,
  updatedAt: string,
  updatedBy:string
}

@Injectable({
  providedIn: 'root',
})
export class Apis2 {
  constructor(private http:HttpClient){}

  BASE_URL='http://localhost:8080/api/categories'

  getAllCategories(){
    return this.http.get<category_struct[]>(this.BASE_URL+'?page=0&size=200')
  }

  getCategoryById(id:number){
    return this.http.get<category_struct[]>(this.BASE_URL+'/'+id)
  }

  createCategory(name:string,description:string){
    const body={
      categoryName:name,
      categoryDescription:description,
    }
    console.log(body)
    return this.http.post(this.BASE_URL,body)
  }

  updateCategory(id:number,name:string,description:string){
    const body={
      categoryName:name,
      categoryDescription:description
    }
    console.log(body,id)
    return this.http.put(this.BASE_URL+'/'+id,body)
  }

  deleteCategory(id:number){
    return this.http.delete(this.BASE_URL+'/'+id)
  }

  searchCategory(name:string){
    return this.http.get<category_struct>(this.BASE_URL+'/search?name='+name)
  }

}
