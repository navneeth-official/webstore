import { Component, signal, Signal, TemplateRef, ViewChild, ViewContainerRef, OnInit, Inject, WritableSignal, computed, OnDestroy } from '@angular/core';
import { Apis2 } from '../services/categories_1/apis';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Apis } from '../services/categories/apis'
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Api3 } from '../services/catalogue-categories/api3';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CategoriesLogic } from '../services/categories_1/categories-logic';
import { ModalService } from '../services/shared/modal.service';

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

@Component({
  selector: 'app-categories',
  imports: [ReactiveFormsModule, MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,RouterLink],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit, OnDestroy {
  filter_catalogue:WritableSignal<string>=signal('none')
  selectedCatalogue = signal(-1)
  search_controller=computed(() => this.CategoriesLogic.search_controller())
  search_categories=computed(() => this.CategoriesLogic.search_categories())
  categories=computed(() => this.CategoriesLogic.categories())
  catalogues=computed(() => this.CategoriesLogic.catalogues())
  normalized_catalogues=computed(() => this.CategoriesLogic.normalized_catalogues())

  constructor(private apis: Apis, private vcr: ViewContainerRef, private apis2: Apis2, private apis3: Api3, private route: ActivatedRoute, private CategoriesLogic: CategoriesLogic, private modalService: ModalService) {
  }

  create = new FormGroup({
    name: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
    description: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
    noOfProducts: new FormControl<number>(0, { validators: Validators.required, nonNullable: true }),
    catalogue: new FormControl<catalogue_interface[]>([], { validators: Validators.required, nonNullable: true })
  })

  edit = new FormGroup({
    id: new FormControl<number>(0),
    name: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
    description: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
    noOfProducts: new FormControl<number>(0, { validators: Validators.required, nonNullable: true }),
    catalogue: new FormControl<catalogue_interface[]>([], { validators: Validators.required, nonNullable: true })
  })

  delete1 = new FormGroup({
    id: new FormControl(0)
  })

  ngOnInit() {
    this.CategoriesLogic.OnInit()

    this.route.params.subscribe((param) => {
      this.filter_catalogue.set(param['catalogue'] ?? 'none')
    })

    this.edit.get('catalogue')?.valueChanges.subscribe(v => {
      console.log('FormControl Value:', v);
    });

    console.log('Patched Value:', this.edit.get('catalogue')?.value);
  }

  updateSearch(event: any) {
    const text = (event.target as HTMLInputElement).value
    this.CategoriesLogic.updateSearch(text)
  }

  loadCatalogues() {
    this.CategoriesLogic.loadCatalogues()
  }

  createCatalogue() {
    const name = this.create.value.name
    const description = this.create.value.description
    const catalogue = this.create.value.catalogue
    if (name != null && description != null && catalogue!=null) {
      this.CategoriesLogic.createCatalogue(name,description,catalogue)
    }
  }

  patchValues(id: number, name: string, desrciption: string, noOfProducts: number, catalogue: catalogue_interface[]) {
    this.edit.patchValue({ id: id, name: name, description: desrciption, noOfProducts: noOfProducts, catalogue: catalogue })
    console.log(this.edit)
  }

  compareCatalogue = (a: any, b: any) => {
    console.log("COMPARE:", a, b);
    return a && b && a.catalogueId === b.catalogueId;
  };

  updateCatalogue() {
    const id = this.edit.value.id
    const name = this.edit.value.name
    const description = this.edit.value.description
    if (id != null && name != null && description != null) {
      this.CategoriesLogic.updateCatalogue(id,name,description)
    }
  }

  patchValue(id: number) {
    this.delete1.patchValue({ id: id })
  }

  deleteCatalogue() {
    const id = this.delete1.value.id
    console.log(id, this.delete1.value.id)
    if (id != null) {
      this.CategoriesLogic.deleteCatalogue(id)
    }
  }

  onCatalogueChange(value: any) {
    const selected = this.create.value.catalogue ?? []
    this.selectedCatalogue.set(selected[0].catalogueId)
    console.log(this.selectedCatalogue())
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
