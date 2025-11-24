import { Component, signal } from '@angular/core';
import { Apis } from '../services/categories/apis';
import { Apis2 } from '../services/categories_1/apis';
import { Apis4 } from '../services/users/apis';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  constructor(private apis: Apis, private apis2: Apis2, private apis4: Apis4) { }
  noOfCatalogues = signal(0)
  noOfCategories = signal(0)
  noOfUsers = signal(0)
  ngOnInit() {
    this.apis.getAllCatalogues().subscribe((data: any) => {
      console.log(data)
      var count = 0
      for (let item of data) {
        count += 1
      }
      this.noOfCatalogues.set(count)
    })

    this.apis2.getAllCategories().subscribe((data: any) => {
      console.log(data)
      var count = 0
      var count = 0
      for (let item of data) {
        count += 1
      }
      this.noOfCategories.set(count)
    })

    this.apis4.getAllUsers().subscribe((data:any) => {
      console.log(data)
      var count = 0
      var count = 0
      for (let item of data) {
        count += 1
      }
      this.noOfUsers.set(count)
  })
  }


}
