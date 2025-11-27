import { Component, computed, ElementRef, signal, TemplateRef, ViewChild, ViewContainerRef, WritableSignal } from '@angular/core';
import { Apis } from '../services/categories/apis';
import { Apis2 } from '../services/categories_1/apis';
import { Api3 } from '../services/catalogue-categories/api3';
import { FormControl, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesLogic } from '../services/categories_1/categories-logic';
import { ModalService } from '../services/shared/modal.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { ProductLogic } from '../services/product/product-logic';
import { CommonModule } from '@angular/common';

interface catalogue_interface {
  catalogueId: number,
  catalogueName: string,
  catalogueDescription: string
}

interface category_struct {
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

interface price_struct {
  currencySymbol: string,
  amount: number
}

@Component({
  selector: 'app-products',
  imports: [ReactiveFormsModule, MatFormField, MatLabel, MatOption, MatSelect, CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {

  // filter_catalogue: WritableSignal<string> = signal('none')
  selectedCatagory:WritableSignal<string>= signal('')
  search_controller = computed(() => this.productsLogic.search_controller())
  search_products = computed(() => this.productsLogic.search_products())
  products1=computed(() => this.productsLogic.products())
  catalogueCategories = computed(() => this.productsLogic.catalogueCategories())
  users = computed(() => this.productsLogic.users())

  constructor(private apis: Apis, private vcr: ViewContainerRef, private apis2: Apis2, private apis3: Api3, private route: ActivatedRoute, private CategoriesLogic: CategoriesLogic, private modalService: ModalService, private productsLogic: ProductLogic) {
  }

  currencies = [{ code: 'USD', symbol: '$' }, { code: 'INR', symbol: '₹' }]
  stocks=['In Stock','Out of Stock','Input Stock']

  catalogueCategoryInit = {
    catalogueCategoryId: 0,
    catalogueId: 0,
    catalogueName: '',
    categoryId: 0,
    categoryName: '',
    createdAt: '',
    createdBy: '',
    updatedAt: '',
    updatedBy: ''
  }

  create = new FormGroup({
    thumbnail: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
    name: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
    catalogueCategory: new FormControl<catalogueCategory>(this.catalogueCategoryInit, { validators: Validators.required, nonNullable: true }),
    stock: new FormControl<number>(0, { validators: Validators.required, nonNullable: true }),
    sellerId: new FormControl<number>(0, { validators: Validators.required, nonNullable: true }),
    price: new FormGroup({
      currencySymbol: new FormControl('', { validators: Validators.required, nonNullable: true }),
      amount: new FormControl(0, { validators: Validators.required, nonNullable: true })
    }),
    status:new FormControl<string>('',{validators:Validators.required,nonNullable:true})
  })

  edit = new FormGroup({
    id: new FormControl<number>(0),
    thumbnail: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
    name: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
    catalogueCategory: new FormControl<catalogueCategory>(this.catalogueCategoryInit, { validators: Validators.required, nonNullable: true }),
    stock: new FormControl<number>(0, { validators: Validators.required, nonNullable: true }),
    sellerId: new FormControl<number>(0, { validators: Validators.required, nonNullable: true }),
    price: new FormGroup({
      currencySymbol: new FormControl('', { validators: Validators.required, nonNullable: true }),
      amount: new FormControl(0, { validators: Validators.required, nonNullable: true })
    }),
    status:new FormControl<string>('Select Stock Status',{validators:Validators.required,nonNullable:true})
  })

  delete1 = new FormGroup({
    id: new FormControl(0)
  })

  ngOnInit() {
    // this.CategoriesLogic.OnInit()
    this.productsLogic.OnInit()

    this.route.params.subscribe((param:any) => {
      this.selectedCatagory.set(param['category'])
      console.log(this.selectedCatagory())
    })

  }

  updateSearch(event: any) {
    const text = (event.target as HTMLInputElement).value
    this.productsLogic.updateSearch(text)
  }

  loadCatalogues() {
    this.CategoriesLogic.loadCatalogues()
  }

  createCatalogue() {
    const thumbnail = this.create.value.thumbnail
    const name = this.create.value.name
    const catalogueCategory = this.create.value.catalogueCategory
    const stock = this.create.value.stock
    const priceAmount = this.create.value.price?.amount
    const priceCurrencySymbol = this.create.value.price?.currencySymbol
    const sellerId = this.create.value.sellerId
    console.log(this.create)
    if (thumbnail != null && name != null && catalogueCategory != null && stock != null && priceAmount != null && priceCurrencySymbol != null && sellerId != null) {
      this.productsLogic.createProduct(thumbnail, name, catalogueCategory, stock, { currencySymbol: priceCurrencySymbol, amount: priceAmount }, sellerId)
    }
  }

  patchValues(id: number, thumbnail: string, name: string, catalogueCategory: catalogueCategory, stock: number, price: price_struct, sellerId: number) {
    this.edit.patchValue({ id: id, thumbnail: thumbnail, name: name, catalogueCategory: catalogueCategory, stock: stock, price: price, sellerId: sellerId })
    console.log(this.edit)
  }

  compareCatalogue = (a: any, b: any) => {
    console.log("COMPARE:", a, b);
    return a && b && a.categoryId === b.categoryId && a.catalogueId == b.catalogueId;
  };

  updateCatalogue() {
    const id = this.edit.value.id
    const thumbnail = this.create.value.thumbnail
    const name = this.edit.value.name
    const catalogueCategory = this.edit.value.catalogueCategory
    const stock = this.edit.value.stock
    const priceAmount = this.edit.value.price?.amount
    const priceCurrencySymbol = this.edit.value.price?.currencySymbol
    const sellerId = this.edit.value.sellerId
    console.log(this.edit,'here')
    if (id != null && thumbnail != null && name != null && catalogueCategory != null && stock != null && priceAmount != null && priceCurrencySymbol != null && sellerId != null) {
      console.log(catalogueCategory)
      this.productsLogic.updateProduct(id, thumbnail, name, catalogueCategory, stock, { currencySymbol: priceCurrencySymbol, amount: priceAmount }, sellerId)
    }
  }

  patchValue(id: number) {
    this.delete1.patchValue({ id: id })
  }

  deleteCatalogue() {
    const id = this.delete1.value.id
    console.log(id, this.delete1.value.id)
    if (id != null) {
      this.productsLogic.deleteCatalogue(id)
    }
  }

  // onCatalogueChange(value: any) {
  //   const selected = this.create.value.catalogue ?? []
  //   this.selectedCatalogue.set(selected[0].catalogueId)
  //   console.log(this.selectedCatalogue())
  // }

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  openFilePicker() {
    this.fileInput.nativeElement.click();
  }
 selectedFile:WritableSignal<File|null>=signal(null)
  onFileSelected(event: Event) {
    const file=(event.target as HTMLInputElement).files?.[0];
    if(file!=null){
      this.selectedFile.set(file)
    }
    console.log("Selected file:", file);
  }

  updateStockStatus(event:any){
    const stock:number=(event.target as HTMLInputElement).valueAsNumber
    if(stock>0){
      this.create.patchValue({status:'In Stock'})
      this.edit.patchValue({status:'In Stock'})
    }
    else{
      this.create.patchValue({status:'Out of Stock'})
      this.edit.patchValue({status:'Out of Stock'})
    }
  }

  @ViewChild('popup1') popupTemplate!: TemplateRef<any>;
  @ViewChild('popup2') popupBTemplate!: TemplateRef<any>;
  @ViewChild('popup3') popupCTemplate!: TemplateRef<any>;

  openOverlay(trigger: HTMLElement) {
    this.modalService.open(this.popupTemplate, this.vcr);
  }

  keepOpen() {
    this.modalService.keepOpen();
  }

  closePopup() {
    this.modalService.close();
  }

  openOverlay1(trigger: HTMLElement) {
    this.modalService.open(this.popupBTemplate, this.vcr);
  }

  keepOpen1() {
    this.modalService.keepOpen();
  }

  closePopup1() {
    this.modalService.close();
  }

  openOverlay2(trigger: HTMLElement) {
    this.modalService.open(this.popupCTemplate, this.vcr);
  }

  keepOpen2() {
    this.modalService.keepOpen();
  }

  closePopup2() {
    this.modalService.close();
  }

  ngOnDestroy() {
    this.modalService.destroy();
  }
}
