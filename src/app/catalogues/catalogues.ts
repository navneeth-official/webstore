import { Component, Signal, signal, TemplateRef, ViewChild, ViewContainerRef, OnInit, WritableSignal, computed, OnDestroy } from '@angular/core';
import { Apis } from '../services/categories/apis';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Tab } from '../services/nav_bar/tab';
import { Apis2 } from '../services/categories_1/apis';
import { Api3 } from '../services/catalogue-categories/api3';
import { CatalogueLogic } from '../services/categories/catalogue-logic';
import { ModalService } from '../services/shared/modal.service';

interface catalogue_struct {
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

@Component({
  selector: 'app-catalogues',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './catalogues.html',
  styleUrl: './catalogues.css',
})

export class Catalogues implements OnInit, OnDestroy {

  catalogues!: catalogue_struct[]
  catalogues1 = computed(() => this.CatalogueLogic.catalogues())

  search_controller = signal<string>('')
  search_catalogues!: catalogue_struct[]
  catalogue_category = computed(() => this.CatalogueLogic.catalogue_category())

  constructor(private apis: Apis, private vcr: ViewContainerRef, private Tab: Tab, private apis3: Api3, private CatalogueLogic: CatalogueLogic, private modalService: ModalService) {
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
    this.CatalogueLogic.loadCatalogues()
    console.log(this.catalogue_category())
  }

  updateSearch(event: any) {
    const text = (event.target as HTMLInputElement).value
    console.log(text)
    this.search_controller.set(text)
    this.apis.searchCatalogue(this.search_controller()).subscribe((data: any) => {
      console.log(data)
      this.search_catalogues = data
    })
  }

  createCatalogue() {
    const name = this.create.value.name
    const description = this.create.value.description
    if (name != null && description != null) {
      this.CatalogueLogic.createCatalogue(name, description)
    }
  }

  patchValues(id: number, name: string, desrciption: string) {
    this.edit.patchValue({ id: id, name: name, description: desrciption })
    console.log(this.edit)
  }

  updateCatalogue() {
    const id = this.edit.value.id
    const name = this.edit.value.name
    const description = this.edit.value.description
    if (id != null && name != null && description != null) {
      this.CatalogueLogic.updateCatalogue(id, name, description)
    }
  }

  patchValue(id: number) {
    this.delete1.patchValue({ id: id })
  }

  deleteCatalogue() {
    const id = this.delete1.value.id
    console.log(id, this.delete1.value.id)
    if (id != null) {
      this.CatalogueLogic.deleteCatalogue(id)
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

  changeTab(tab: string) {
    this.Tab.current_tab.set(tab)
  }

}
