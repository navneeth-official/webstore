import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  cards=[{id:1,name:'Fresh Produce', description:'Fresh Fruits,Vegetables', mapped_categories:'Fresh Vegetables'},
    {id:2,name:'Fresh Produce', description:'Fresh Fruits,Vegetables', mapped_categories:'Fresh Vegetables'},
    {id:3,name:'Fresh Produce', description:'Fresh Fruits,Vegetables', mapped_categories:'Fresh Vegetables'},
    {id:4,name:'Fresh Produce', description:'Fresh Fruits,Vegetables', mapped_categories:'Fresh Vegetables'},
    // {id:4,name:'Fresh Produce', description:'Fresh Fruits,Vegetables', mapped_categories:'Fresh Vegetables'}
  ]
}
