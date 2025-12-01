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

  users: WritableSignal<Users[]> = signal([])
  search_users: WritableSignal<Users[]> = signal([])

  loadUsers() {
    this.apis4.getAllUsers().subscribe(
      {
        next: (data: any) => {
          this.users.set([...data])
          console.log(this.users())
        },
        error: (error) => { console.log('Error Loading All Users:', error) }
      })
  }

  createUser(name: string, email: string, status: string, joiningDate: string) {
    if (name != null && email != null && status != null && joiningDate != null) {
      this.apis4.createUser(name, email, status, joiningDate).subscribe({
        next: (data: any) => {
          console.log(data),
            this.loadUsers()
        },
        error: (error) => { console.log('Error creating user:',error) }
      })
    }
  }

  updateUser(id: number, name: string, email: string, status: string, joiningDate: string) {
    if (id != null && name != null && email != null && status != null && joiningDate != null) {
      this.apis4.updateUser(id, name, email, status, joiningDate).subscribe({
        next: (data: any) => {
          console.log(data),
            this.loadUsers()
        }, error: (error) => { console.log('Error updating user:', error) }
      })
    }
  }

  deleteUser(id: number) {
    if (id != null) {
      this.apis4.deleteUser(id).subscribe({
        next: (data: any) => {
          console.log(data)
          this.loadUsers()
        },
        error:(error)=>{console.log('Error while trying to delete user',error)}
      },)
    }
  }

  searchUpdate(text: string) {
    this.apis4.searchUsers(text).subscribe({next: (data: any) => {
      console.log(data)
      this.search_users.set([...data])
    },error:(error)=>{console.log('Error while trying to search user',error)} })
  }

}
