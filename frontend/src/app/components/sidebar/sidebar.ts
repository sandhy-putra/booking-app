import { Component, OnInit, signal } from '@angular/core';
import { MenuService, Menu } from '../../services/menu';
import { MenuItemComponent } from '../menu-item/menu-item';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MenuItemComponent],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class SidebarComponent implements OnInit {
  menus = signal<Menu[]>([]);

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuService.getMenus().subscribe({
      next: (data) => this.menus.set(data),
      error: (err) => console.error('Error loading menus:', err)
    });
  }
}