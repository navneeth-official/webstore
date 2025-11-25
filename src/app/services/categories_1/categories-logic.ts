import { Injectable, signal, WritableSignal } from '@angular/core';
import { Apis } from '../categories/apis';
import { Apis2 } from './apis';
import { Api3 } from '../catalogue-categories/api3';

interface db_catalogues {
  catalogueId: number,
  catalogueName: string,
  catalogueDescription: string,
  createdAt: string,
  createdBy: string,
  updatedAt: string,
  updatedBy: string,
  categories: any
}

interface catalogue_interface {
  catalogueId: number,
  catalogueName: string,
  catalogueDescription: string
}

interface category {
  categoryId: number,
  categoryName: string,
  categoryDescription: string,
  catalogues: catalogue_interface[],
  productCount: number,
  createdAt: string,
  createdBy: string,
  updatedAt: string,
  updatedBy: string,
  open: WritableSignal<boolean>
}
@Injectable({
  providedIn: 'root',
})
export class CategoriesLogic {
  constructor(private apis: Apis, private apis2: Apis2, private apis3: Api3) { }

  categories: WritableSignal<category[]> = signal([])
  catalogues: WritableSignal<db_catalogues[]> = signal([])
  normalized_catalogues: WritableSignal<catalogue_interface[]> = signal([])
  search_controller:WritableSignal<string>=signal('')
  search_categories:WritableSignal<category[]>=signal([])

  OnInit() {

    this.apis.getAllCatalogues().subscribe((data: any) => {
      console.log(data)
      this.catalogues.set([...data])
      this.normalized_catalogues.set(this.catalogues().map(c => ({
        catalogueId: c.catalogueId,
        catalogueName: c.catalogueName,
        catalogueDescription: c.catalogueDescription
      })))
    })

    this.loadCatalogues()
  }

  loadCatalogues() {
    this.apis2.getAllCategories().subscribe((data: any) => {
      this.categories.set([...data])
      this.categories.set(data.map((c: any) => ({
        ...c,
        open: signal(false)
      })));
    })
  }

  createCatalogue(name: string, description: string, catalogue: any) {
    if (name != null && description != null) {
      this.apis2.createCategory(name, description).subscribe((data: any) => {
        console.log(data),
          this.apis2.getAllCategories().subscribe((data: any) => {
            this.categories.set([...data])
            for (let category of this.categories()) {
              if (category.categoryName?.trim().toLowerCase() === name?.trim().toLowerCase()) {
                for (let c of catalogue) {
                  this.apis3.createCatalogueCategory(c.catalogueId, category.categoryId).subscribe((data: any) => {
                    console.log(data)
                    this.loadCatalogues()
                  })
                }
              }
            }
            this.loadCatalogues()
          })
        console.log(this.loadCatalogues)
      })
    }
  }

  updateCatalogue(id: number, name: string, description: string) {
    if (id != null && name != null && description != null) {
      this.apis2.updateCategory(id, name, description).subscribe((data: any) => [
        console.log(data),
        this.loadCatalogues()
      ])
    }
  }

  deleteCatalogue(id: number) {
    if (id != null) {
      this.apis2.deleteCategory(id).subscribe((data: any) => {
        console.log(data)
        this.loadCatalogues()
      })
    }
  }

  updateSearch(text:string) {
    this.search_controller.set(text)
    this.apis2.searchCategory(this.search_controller()).subscribe((data: any) => {
      console.log(data)
      this.search_categories.set([...data])
    })
  }
}




