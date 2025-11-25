import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal, OnInit, computed } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Tab } from '../services/nav_bar/tab';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  current_tab=computed(() =>this.Tab.current_tab())

  constructor(private Tab:Tab){
    this.Tab.current_tab.set('dashboard')
  }

  ngOnInit(){
    this.Tab.current_tab.set('dashboard')
  }

  changeTab(tab:string){
    this.Tab.current_tab.set(tab)
  }
}
