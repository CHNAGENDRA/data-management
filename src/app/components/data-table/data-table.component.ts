import { Component, effect, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { DataRecord } from '../../models/data-record.model';
import { DataService } from '../../services/data.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';

@Component({
  selector: 'app-data-table',
  imports: [CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDividerModule, MatFormFieldModule, MatInputModule],
  standalone: true,
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent implements OnInit, OnDestroy {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<DataRecord>();
  isLoading = false;

  private destroy$ = new Subject<void>();

  displayedColumns: string[] = [
    'serial', 'date', 'branch', 'course', 'division',
    'customer', 'csr', 'status', 'outlineShared', 'deadline'
  ];

  constructor(private dataService: DataService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.dataService.loadUsers();

    this.dataService.users$
      .pipe(takeUntil(this.destroy$), debounceTime(500))
      .subscribe(users => {
        this.dataSource.data = users;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false; 
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getStatusClass(status: string): string {
    return `status-${status.toLowerCase()}`;
  }
  refreshData(){
    this.dataService.loadUsers();
    console.log('Data refreshed');
  }
  exportData(){
    console.log('Exporting data...');
  }
  editRecord(action: string){
    console.log('Editing record...');
  }
  deleteRecord(action: string)
  {
    console.log('Deleting record...');
  }

  openRegistrationDialog(): void {
    const dialogRef = this.dialog.open(RegistrationDialogComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action !== 'delete') {
        this.dataSource.data = [...this.dataSource.data, result];
      }
    });
  }
}

