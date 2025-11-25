import { Component, signal, TemplateRef, ViewChild, ViewContainerRef, OnInit, computed, Injectable, Signal, WritableSignal, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Apis4 } from '../services/users/apis';
import { UserLogic } from '../services/users/user-logic';
import { ModalService } from '../services/shared/modal.service';
interface catalogue_struct {
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

@Component({
  selector: 'app-users',
  imports: [ReactiveFormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit, OnDestroy {
  users!: catalogue_struct[]
  users1=computed(() => this.UserLogic.users())
  search_controller = signal<string>('')
  search_catalogues!: catalogue_struct[]
  search_users=computed(() => this.UserLogic.search_users())

  constructor(private apis: Apis4, private vcr: ViewContainerRef, private UserLogic: UserLogic, private modalService: ModalService) {
  }

  create = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    joiningDate: new FormControl('', Validators.required)
  })

  edit = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    joiningDate: new FormControl('', Validators.required)
  })

  delete1 = new FormGroup({
    id: new FormControl(0)
  })

  ngOnInit() {
    this.UserLogic.loadUsers()
  }

  createUser() {
    const name = this.create.value.name
    const email = this.create.value.email
    const status = this.create.value.status
    const joiningDate = this.create.value.joiningDate
    if (name != null && email != null && status != null && joiningDate != null) {
    this.UserLogic.createUser(name,email,status,joiningDate)
    }
  }

  patchValues(id: number, name: string, email: string, status: string, joiningDate: string) {
    this.edit.patchValue({ id: id, name: name, email: email, status: status, joiningDate: joiningDate })
    console.log(this.edit)
  }

  updateUser() {
    const id = this.edit.value.id
    const name = this.edit.value.name
    const email = this.edit.value.email
    const status = this.edit.value.status
    const joiningDate = this.edit.value.joiningDate
    if (id!=null && name != null && email != null && status != null && joiningDate != null) {
      this.UserLogic.updateUser(id,name,email,status,joiningDate)
    }
  }

  patchValue(id: number) {
    this.delete1.patchValue({ id: id })
  }

  deleteUser() {
    const id = this.delete1.value.id
    console.log(id, this.delete1.value.id)
    if (id != null) {
      this.UserLogic.deleteUser(id)
    }
  }

  searchUpdate(event: any) {
    const text = (event.target as HTMLInputElement).value
    this.search_controller.set(text)
    this.UserLogic.searchUpdate(text)
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
