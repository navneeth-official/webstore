import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Apis {
  constructor(private http:HttpClient){}

  BASE_URL='http://localhost:8080/api/sellers'

  getAllUsers(){
    return this.http.get(this.BASE_URL)
  }

  getUserById(id:number){
    return this.http.get(this.BASE_URL+'/'+id)
  }

  // createUser(name:string,email:string,role:string,joindate:string){
  //   const body={
  //     username:name,
  //     email:email,
  //     fullName:name,
  //     role:role,
  //     createdAt:new Date(),
  //     updatedAt:new Date(),
  //   }
  //   console.log(body)
  //   return this.http.post(this.BASE_URL,body)
  // }

  // updateUser(id:number,name:string,email:string,role:string,joindate:string){
  //   const body={
  //     username:name,
  //     email:email,
  //     fullName:name,
  //     role:role,
  //     createdAt:new Date(),
  //     updatedAt:new Date(),
  //   }
  //   return this.http.put(this.BASE_URL+'/'+id,body)
  // }

  
  createUser(name:string,email:string,status:string,joiningdate:string){
    const body={
      name:name,
      email:email,
      status:status,
      joiningDate:joiningdate,
      // createdAt:new Date(),
      // updatedAt:new Date(),
      // createdBy:new Date(),
      // updatedBy:new Date(),
    }
    return this.http.post(this.BASE_URL,body)
  }

  updateUser(id:number,name:string,email:string,status:string,joiningdate:string){
    const body={
      name:name,
      email:email,
      status:status,
      joiningDate:joiningdate,
      // createdAt:new Date(),
      // updatedAt:new Date(),
      // createdBy:new Date(),
      // updatedBy:new Date(),
    }
    console.log(body)
    return this.http.put(this.BASE_URL+'/'+id,body)
  }

  deleteUser(id:number){
    return this.http.delete(this.BASE_URL+'/'+id)
  }

  searchUsers(name:string){
    return this.http.get(this.BASE_URL+'/search?keyword='+name)
  }
}
