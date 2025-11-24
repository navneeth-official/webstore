import { Component, signal, Signal, TemplateRef, ViewChild, ViewContainerRef, OnInit, Inject, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Apis2 } from '../services/categories_1/apis';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TemplatePortal } from '@angular/cdk/portal';
import { Apis } from '../services/categories/apis'
import { ActivatedRoute } from '@angular/router';
import { Api3 } from '../services/catalogue-categories/api3';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

interface db_catalogue_struct {
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
  open:WritableSignal<boolean>
}

@Component({
  selector: 'app-categories',
  imports: [ReactiveFormsModule, MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {
  categories!: category_struct[]
  catalogues!: db_catalogue_struct[]
  categories1!: Signal<category_struct[]>
  filter_catalogue!: string
  selectedCatalogue = signal(-1)
  search_controller = signal<string>('')
  search_categories!: category_struct[]
  normalized_catalogues!: catalogue_interface[]

  category!: Observable<category_struct[]>

  constructor(private apis: Apis, private overlay: Overlay, private vcr: ViewContainerRef, private apis2: Apis2, private apis3: Api3, private route: ActivatedRoute) {
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
    this.apis2.getAllCategories().subscribe((data: any) => {
      console.log(data)
      this.categories = [...data]
      this.categories = data.map((c: any) => ({
        ...c,
        open: signal(false)
      }));
    })

    this.apis.getAllCatalogues().subscribe((data: any) => {
      console.log(data)
      this.catalogues = [...data]
      this.normalized_catalogues = this.catalogues.map(c => ({
        catalogueId: c.catalogueId,
        catalogueName: c.catalogueName,
        catalogueDescription: c.catalogueDescription
      }))
    })

    this.filter_catalogue = this.route.snapshot.paramMap.get('catalogue') ?? ''
    console.log(this.filter_catalogue)

    this.edit.get('catalogue')?.valueChanges.subscribe(v => {
      console.log('FormControl Value:', v);
    });

    console.log('Patched Value:', this.edit.get('catalogue')?.value);
  }

  updateSearch(event: any) {
    const text = (event.target as HTMLInputElement).value
    console.log(text)
    this.search_controller.set(text)
    this.apis2.searchCategory(this.search_controller()).subscribe((data: any) => {
      console.log(data)
      this.search_categories = [...data]
    })
  }

  loadCatalogues() {
    this.apis2.getAllCategories().subscribe((data: any) => {
      this.categories = [...data]
      this.categories = data.map((c: any) => ({
        ...c,
        open: signal(false)
      }));
    })
  }

  createCatalogue() {
    const name = this.create.value.name
    const description = this.create.value.description
    const catalogue = this.create.value.catalogue ?? []
    console.log(catalogue)
    this.apis2.createCategory(name ?? '', description ?? '').subscribe((data: any) => {
      console.log(data),
        this.apis2.getAllCategories().subscribe((data: any) => {
          this.categories = [...data]
          for (let category of this.categories) {
            if (category.categoryName?.trim().toLowerCase() === name?.trim().toLowerCase()) {
              console.log(this.selectedCatalogue(), category.categoryId)
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
    this.apis2.updateCategory(id ?? 0, name ?? '', description ?? '').subscribe((data: any) => [
      console.log(data),
      this.apis3.createCatalogueCategory(this.selectedCatalogue(), id ?? 0).subscribe((data: any) => {
        console.log(data)
        this.loadCatalogues()
      }),
      this.loadCatalogues()
    ])
  }

  patchValue(id: number) {
    this.delete1.patchValue({ id: id })
  }

  deleteCatalogue() {
    const id = this.delete1.value.id
    console.log(id, this.delete1.value.id)
    this.apis2.deleteCategory(id ?? 0).subscribe((data: any) => {
      console.log(data)
      this.loadCatalogues()
    })
  }

  onCatalogueChange(value: any) {
    const selected = this.create.value.catalogue ?? []
    this.selectedCatalogue.set(selected[0].catalogueId)
    console.log(this.selectedCatalogue())
  }

  private overlayRef?: OverlayRef;
  private overlayRef1?: OverlayRef;
  private overlayRef2?: OverlayRef;

  private closeTimeout: any;
  private closeTimeout1: any;
  private closeTimeout2: any;

  @ViewChild('popup1') popupTemplate!: TemplateRef<any>;
  @ViewChild('popup2') popupBTemplate!: TemplateRef<any>;
  @ViewChild('popup3') popupCTemplate!: TemplateRef<any>;

  openOverlay(trigger: HTMLElement) {
    clearTimeout(this.closeTimeout);

    if (!this.overlayRef) {
      const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();
      this.overlayRef = this.overlay.create({ positionStrategy });
      const portal = new TemplatePortal(this.popupTemplate, this.vcr);
      this.overlayRef.attach(portal);
    }
  }

  keepOpen() {
    clearTimeout(this.closeTimeout);
    this.closePopup1()
    this.closePopup2()
  }

  closePopup() {
    this.closeTimeout = setTimeout(() => {
      this.overlayRef?.detach();
      this.overlayRef = undefined;
    }, 150); // slight delay to allow moving between button & popup
  }

  openOverlay1(trigger: HTMLElement) {
    clearTimeout(this.closeTimeout1)

    if (!this.overlayRef1) {
      const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically()

      this.overlayRef1 = this.overlay.create({ positionStrategy });
      const portal = new TemplatePortal(this.popupBTemplate, this.vcr);
      this.overlayRef1.attach(portal);
    }
  }

  keepOpen1() {
    clearTimeout(this.closeTimeout1);
    this.closePopup()
    this.closePopup2()
  }

  closePopup1() {
    this.closeTimeout1 = setTimeout(() => {
      this.overlayRef1?.detach();
      this.overlayRef1 = undefined;
    }, 150); // slight delay to allow moving between button & popup
  }

  openOverlay2(trigger: HTMLElement) {
    clearTimeout(this.closeTimeout1)

    if (!this.overlayRef2) {
      const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically()

      this.overlayRef2 = this.overlay.create({ positionStrategy });
      const portal = new TemplatePortal(this.popupCTemplate, this.vcr);
      this.overlayRef2.attach(portal);
    }
  }

  keepOpen2() {
    clearTimeout(this.closeTimeout2);
    this.closePopup()
    this.closePopup1()
  }

  closePopup2() {
    this.closeTimeout2 = setTimeout(() => {
      this.overlayRef2?.detach();
      this.overlayRef2 = undefined;
    }, 150); // slight delay to allow moving between button & popup
  }
}
