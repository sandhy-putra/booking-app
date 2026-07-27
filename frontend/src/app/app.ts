import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { MenuService, Menu } from './services/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title = 'frontend';
  menus = signal<Menu[]>([]);

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuService.getMenus().subscribe({
      next: (data) => {
        this.menus.set(data);
        console.log('Menus:', data);
      },
      error: (err) => console.error('Error:', err)
    });
  }
}