import { Injectable, signal, WritableSignal } from '@angular/core';
import { Apis } from '../categories/apis';
import { Apis2 } from '../categories_1/apis';
import { Api3 } from '../catalogue-categories/api3';
import { Apis5 } from './apis5';
import { Apis6 } from '../productPrice/apis6';
import { Apis4 } from '../users/apis';

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
  imageUrl: string,
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

interface price_struct {
  currencySymbol: string,
  amount: number
}

interface Users {
  sellerId: number,
  name: string,
  email: string,
  status: string,
  joiningDate: string,
  createdAt: string,
  updatedAt: string,
  createdBy: string,
  updatedBy: string,
}

@Injectable({
  providedIn: 'root',
})
export class ProductLogic {

  constructor(private apis: Apis, private apis2: Apis2, private apis3: Api3, private apis5: Apis5, private apis6: Apis6, private apis4: Apis4) { }


  products: WritableSignal<products[]> = signal([])
  catalogueCategories: WritableSignal<catalogueCategory[]> = signal([])
  users: WritableSignal<Users[]> = signal([])
  search_controller: WritableSignal<string> = signal('')
  search_products: WritableSignal<products[]> = signal([])

  OnInit() {

    this.apis3.getAllCatalogueCategory().subscribe((data: any) => {
      console.log(data)
      this.catalogueCategories.set([...data])
    })

    this.apis4.getAllUsers().subscribe((data: any) => {
      console.log(data)
      this.users.set([...data])
    })

    this.loadProducts()
  }

  loadProducts() {
    this.apis5.getAllProducts().subscribe((data: any) => {
      // console.log(data)
      this.products.set([...data])
      console.log(this.products())
    })
  }

  createProduct(thumbnail: string, name: string, catalogueCategory: catalogueCategory, stock: number, price: price_struct, sellerId: number) {
    if (thumbnail != null && name != null && catalogueCategory != null && stock != null && price != null && sellerId != null) {
      const catalogueCategorynNormalized = { catalogueId: catalogueCategory.catalogueId, categoryId: catalogueCategory.categoryId }
      this.apis5.createProduct(thumbnail, name, catalogueCategorynNormalized, stock, sellerId).subscribe((data: any) => {
        console.log(data),
          this.apis5.getAllProducts().subscribe((data: any) => {
            console.log(data)
            this.products.set([...data])
            for (let product of this.products()) {
              if (product.productName == name) {
                this.apis6.createProductPrice(product.productId, 1, price.amount).subscribe((data: any) => {
                  console.log(data)
                  this.loadProducts()
                })
              }
            }
          })
      })
    }
  }

  updateProduct(id: number, thumbnail: string, name: string, catalogueCategory: catalogueCategory, stock: number, price: price_struct, sellerId: number) {
    if (thumbnail != null && name != null && catalogueCategory != null && stock != null && price != null && sellerId != null) {
      const catalogueCategorynNormalized = { catalogueId: catalogueCategory.catalogueId, categoryId: catalogueCategory.categoryId }
      console.log(catalogueCategorynNormalized)
      let productPriceId = 0
      console.log(id, thumbnail, name, catalogueCategory, stock, sellerId, 'here')
      this.apis5.updateProduct(id, thumbnail, name, catalogueCategorynNormalized, stock, sellerId).subscribe((data: any) => [
        console.log(data),
        this.apis6.getAllProducts().subscribe((data: any) => {
          for (let productPrice of data) {
            if (productPrice.productId == id) {
              this.apis6.updateProductprice(productPrice.productPriceId, price.amount).subscribe((data: any) => {
                console.log(data)
                this.loadProducts()
              })
            }
          }
        }),
      ])
    }
  }

  deleteCatalogue(id: number) {
    if (id != null) {
      this.apis5.deleteProduct(id).subscribe((data: any) => {
        console.log(data)
        this.loadProducts()
      })
    }
  }

  updateSearch(text: string) {
    this.search_controller.set(text)
    this.apis2.searchCategory(this.search_controller()).subscribe((data: any) => {
      console.log(data)
      this.search_products.set([...data])
    })
  }
}
