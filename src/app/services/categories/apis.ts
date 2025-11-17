import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Catalogues } from '../../catalogues/catalogues';

interface catalogue_struct {
  catalogueId: number,
  catalogueName: string,
  catalogueDescription: string,
  createdAt: string,
  createdBy: string,
  updatedAt: string,
  updatedBy: string,
  categories: any
  // mapped_categories: string[]
}

@Injectable({
  providedIn: 'root',
})
export class Apis {
  constructor(private http: HttpClient) { }

  BASE_URL = 'http://localhost:8080/api/catalogues'


  getAllCatalogues() {
    return this.http.get<catalogue_struct[]>(this.BASE_URL)
  }

  getCataloguesById(id: number) {
    return this.http.get<catalogue_struct[]>(this.BASE_URL + '/' + id)
  }

  createCatalogues(name: string, description: string) {
    const body = {
      catalogueName: name,
      catalogueDescription: description,
      createdAt: new Date(),
      createdBy: 'ADMIN',
      updatedAt: new Date(),
      categories: null
    }
    return this.http.post(this.BASE_URL, body)
  }

  updateCatalogues(id: number, name: string, description: string) {
    const body = {
      catalogueId: id,
      catalogueName: name,
      catalogueDescription: description,
        createdAt: new Date(),
      createdBy: 'ADMIN',
      updatedAt: new Date(),
      categories: null
    }
    return this.http.put(this.BASE_URL+'/'+id, body)
  }

  deleteCatalogue(id: number) {
    return this.http.delete(this.BASE_URL + '/' + id)
  }

  searchCatalogue(name:string){
    return this.http.get<catalogue_struct[]>(this.BASE_URL+'/search?name='+name)
  }

}
