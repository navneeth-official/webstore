import { Injectable, signal, WritableSignal } from '@angular/core';
import { Apis4 } from './apis';
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
export class UserLogic {

  constructor(private apis4: Apis4) { }

  users: WritableSignal<Users[]>=signal([])
  // search_controller!:WritableSignal<string>
  search_users:WritableSignal<Users[]>=signal([])

  loadUsers() {
    this.apis4.getAllUsers().subscribe((data: any) => {
      this.users.set([...data])
      console.log(this.users())
    })
  }

  createUser(name: string, email: string, status: string, joiningDate: string) {
    if (name != null && email != null && status != null && joiningDate != null) {
      this.apis4.createUser(name, email, status, joiningDate).subscribe((data: any) => {
        console.log(data),
          this.loadUsers()
      })
    }
  }

  updateUser(id: number, name: string, email: string, status: string, joiningDate: string) {
    if (id != null && name != null && email != null && status != null && joiningDate != null) {
      this.apis4.updateUser(id, name, email, status, joiningDate).subscribe((data: any) => [
        console.log(data),
        this.loadUsers()
      ])
    }
  }

  deleteUser(id:number) {
    if (id != null) {
      this.apis4.deleteUser(id).subscribe((data: any) => {
        console.log(data)
        this.loadUsers()
      })
    }
  }

  searchUpdate(text:string) {
    // this.search_controller.set(text)
    this.apis4.searchUsers(text).subscribe((data: any) => {
      console.log(data)
      this.search_users.set([...data])
    })
  }


}
