import { Injectable, signal, WritableSignal } from '@angular/core';
import { Apis } from './apis';
import { Catalogues } from '../../catalogues/catalogues';
import { Api3 } from '../catalogue-categories/api3';

interface catalogues {
  catalogueId: number,
  catalogueName: string,
  catalogueDescription: string,
  createdAt: string,
  createdBy: string,
  updatedAt: string,
  updatedBy: string,
  categories: any,
  open: WritableSignal<boolean>
}

interface catalogue_category {
  catalogueId: number,
  categoryIds: string[]
}

@Injectable({
  providedIn: 'root',
})
export class CatalogueLogic {
  constructor(private apis: Apis, private apis3: Api3) { }

  catalogues: WritableSignal<catalogues[]> = signal([])
  catalogue_category: WritableSignal<catalogue_category[]> = signal([])

  loadCatalogues() {
    this.apis.getAllCatalogues().subscribe((data: any) => {
      this.catalogues.set(data.map((d:any)=>({...d,open:signal(false)})))
      this.loadCatalogueCategory()
    })
  }

  createCatalogue(name: string, description: string) {
    if (name != null && description != null) {
      this.apis.createCatalogues(name, description).subscribe((data: any) => {
        console.log(data),
          this.loadCatalogues()
      })
    }
  }

  updateCatalogue(id: number, name: string, description: string) {
    if (id != null && name != null && description != null) {
      this.apis.updateCatalogues(id ?? 0, name ?? '', description ?? '').subscribe((data: any) => [
        console.log(data),
        this.loadCatalogues()
      ])
    }
  }

  deleteCatalogue(id: number) {
    if (id != null) {
      this.apis.deleteCatalogue(id).subscribe((data: any) => {
        console.log(data)
        this.loadCatalogues()
      })
    }
  }

  loadCatalogueCategory() {
    this.apis3.getAllCatalogueCategory().subscribe((data: any) => {
      console.log(data)
      for (let cc of data) {
        var categories: string[] = []
        for (let cc1 of data) {
          if (cc.catalogueId == cc1.catalogueId && cc.categoryId != cc1.categoryId) {
            categories = [...categories, cc1.categoryName]
          }
        }
        var count = 0
        for (let c of this.catalogue_category()) {
          if (c.catalogueId == cc.catalogueId) {
            count = count + 1
          }
        }
        if (count == 0) {
          this.catalogue_category().push({ catalogueId: cc.catalogueId, categoryIds: categories })
        }
      }
      console.log("catalogue-category-mappings:" + this.catalogue_category)
    })
  }

}
