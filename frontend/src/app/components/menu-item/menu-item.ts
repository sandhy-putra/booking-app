import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Menu } from '../../services/menu';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-item.html',
  styleUrl: './menu-item.scss'
})
export class MenuItemComponent {
  @Input() menu!: Menu;
  expanded = false;

  toggle() {
    this.expanded = !this.expanded;
  }

  get hasChildren(): boolean {
    return !!(this.menu.children_recursive && this.menu.children_recursive.length > 0);
  }
}