import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  current_tab=signal('dashboard')

  constructor(){
    this.current_tab.set('dashboard')
    console.log(this.current_tab)
  }

  ngOnInit(){
    this.current_tab.set('dashboard')
    console.log(this.current_tab)
  }

  changeTab(tab:string){
    this.current_tab.set(tab)
  }
}
