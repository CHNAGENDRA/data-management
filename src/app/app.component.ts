import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  imports: [DataTableComponent, ToolbarComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'data-management-app';
}
