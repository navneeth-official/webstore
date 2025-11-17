import { Component, signal, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { describe } from 'node:test';
import { Apis } from '../services/users/apis';
interface catalogue_struct {
    sellerId:number,
    name: string,
    email:string,
    status:string,
    joiningDate:string,
    createdAt: string,
    updatedAt: string,
    createdBy:string,
    updatedBy:string,
  // mapped_categories: string[]
}

@Component({
  selector: 'app-users',
  imports: [ReactiveFormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
    users!: catalogue_struct[]

    search_controller=signal<string>('')
    search_catalogues!:catalogue_struct[]

  constructor(private apis:Apis, private overlay: Overlay, private vcr: ViewContainerRef) { }

  create = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    status: new FormControl('',Validators.required),
    joiningDate: new FormControl('',Validators.required)
  })

  edit = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    status: new FormControl('',Validators.required),
    joiningDate: new FormControl('',Validators.required)
  })

  delete1 = new FormGroup({
    id: new FormControl(0)
  })

  ngOnInit() {
    this.apis.getAllUsers().subscribe((data: any) => {
      console.log(data)
      // this.catalogues.update(value => [...data])
      this.users = [...data]
    })
  }

  loadUsers() {
    this.apis.getAllUsers().subscribe((data: any) => {
      // this.catalogues.update(value => [...data])
      this.users = [...data]
    })
  }

  createUser() {
    const name = this.create.value.name
    const email = this.create.value.email
    const status =this.create.value.status
    const joiningDate=this.create.value.joiningDate
    console.log(joiningDate)
    this.apis.createUser(name ?? '', email ?? '',status ?? 'ACTIVE',joiningDate ?? '').subscribe((data: any) => {
      console.log(data),
        this.loadUsers()
    })
  }

  patchValues(id: number, name: string, email:string,status:string,joiningDate:string) {
    this.edit.patchValue({ id: id, name: name, email:email, status:status , joiningDate:joiningDate})
    console.log(this.edit)
  }

  updateUser() {
    const id = this.edit.value.id
    const name = this.edit.value.name
    const email = this.edit.value.email
    const status = this.edit.value.status
    const joiningDate=this.edit.value.joiningDate
    console.log('user_body'+joiningDate)
    this.apis.updateUser(id ?? 0, name ?? '', email ?? '',status ?? 'ACTIVE',joiningDate ?? '').subscribe((data: any) => [
      console.log(data),
      this.loadUsers()
    ])
  }

  patchValue(id: number) {
    this.delete1.patchValue({id:id})
  }

  deleteUser() {
    const id = this.delete1.value.id
    console.log(id, this.delete1.value.id)
    this.apis.deleteUser(id ?? 0).subscribe((data: any) => {
      console.log(data)
      this.loadUsers()
    })
  }

  searchUpdate(event:any){
    const text=(event.target as HTMLInputElement).value
    this.search_controller.set(text)
    this.apis.searchUsers(this.search_controller()).subscribe((data:any) => {
      console.log(data)
      this.search_catalogues=data
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
