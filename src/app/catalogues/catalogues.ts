import { Component, Signal, signal, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Apis } from '../services/categories/apis';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { describe } from 'node:test';
import { BehaviorSubject, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
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

@Component({
  selector: 'app-catalogues',
  imports: [ReactiveFormsModule],
  templateUrl: './catalogues.html',
  styleUrl: './catalogues.css',
})

export class Catalogues {

  catalogues!:catalogue_struct[]
  catalogues1!:Signal<catalogue_struct[]>

  search_controller=signal<string>('')
  search_catalogues!: catalogue_struct[]

  catalogue!:Observable<catalogue_struct[]>

  constructor(private apis: Apis, private overlay: Overlay, private vcr: ViewContainerRef) {
    this.catalogue=this.apis.getAllCatalogues()
    this.catalogues1=toSignal(this.catalogue,{initialValue:[]})
   }

  create = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  })

  edit = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  delete1 = new FormGroup({
    id: new FormControl(0)
  })

  ngOnInit() {
    this.apis.getAllCatalogues().subscribe((data: any) => {
      console.log(data)
      // this.catalogues.update(value => [...data])
      this.catalogues = [...data]
    })
  }

  updateSearch(event:any){
    const text=(event.target as HTMLInputElement).value
    console.log(text)
    this.search_controller.set(text)
    this.apis.searchCatalogue(this.search_controller()).subscribe((data:any) => {
      console.log(data)
      this.search_catalogues=data
    })
    
  }

  loadCatalogues() {

    this.catalogue=this.apis.getAllCatalogues()
    this.catalogues1=toSignal(this.catalogue,{initialValue:[]})
    this.apis.getAllCatalogues().subscribe((data: any) => {
      this.catalogues = [...data]
    })
  }

  createCatalogue() {
    const name = this.create.value.name
    const description = this.create.value.description
    this.apis.createCatalogues(name ?? '', description ?? '').subscribe((data: any) => {
      console.log(data),
        this.loadCatalogues()
    })
  }

  patchValues(id: number, name: string, desrciption: string) {
    this.edit.patchValue({ id: id, name: name, description: desrciption })
    console.log(this.edit)
  }

  updateCatalogue() {
    const id = this.edit.value.id
    const name = this.edit.value.name
    const description = this.edit.value.description
    this.apis.updateCatalogues(id ?? 0, name ?? '', description ?? '').subscribe((data: any) => [
      console.log(data),
      this.loadCatalogues()
    ])
  }

  patchValue(id: number) {
    this.delete1.patchValue({id:id})
  }

  deleteCatalogue() {
    const id = this.delete1.value.id
    console.log(id, this.delete1.value.id)
    this.apis.deleteCatalogue(id ?? 0).subscribe((data: any) => {
      console.log(data)
      this.loadCatalogues()
    })
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
