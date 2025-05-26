import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CompoundService } from '../../services/compound.service';
import { Compound } from '../../models/compound.model';
import { trigger, transition, style, animate } from '@angular/animations';
import { AddCompoundDialogComponent } from '../add-compound-dialog/add-compound-dialog.component';
import { EditCompoundDialogComponent } from '../edit-compound-dialog/edit-compound-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-compound-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './compound-edit.component.html',
  styleUrl: './compound-edit.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('buttonHover', [
      transition(':enter', [
        style({ transform: 'translateX(-10px)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class CompoundEditComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'image', 'actions'];
  dataSource = new MatTableDataSource<Compound>([]);
  pageSize = 10;
  totalCompounds = 0;
  pageIndex = 0;
  loading = true;
  error: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private compoundService: CompoundService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCompounds(this.pageIndex + 1, this.pageSize);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadCompounds(page: number, limit: number): void {
    this.loading = true;
    this.error = null;
    this.compoundService.getCompounds(page, limit).subscribe({
      next: (response) => {
        this.dataSource.data = response.compounds;
        this.totalCompounds = response.total;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load compounds. Please try again.';
        console.error('Load compounds error:', err);
        this.loading = false;
      }
    });
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCompounds(this.pageIndex + 1, this.pageSize);
  }

  onAdd(): void {
    const dialogRef = this.dialog.open(AddCompoundDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.compoundService.createCompound(result).subscribe({
          next: () => {
            this.snackBar.open('Compound added successfully', 'Close', { duration: 3000 });
            this.loadCompounds(this.pageIndex + 1, this.pageSize);
          },
          error: (err) => {
            this.snackBar.open('Failed to add compound. Please try again.', 'Close', { duration: 3000 });
            console.error('Add compound error:', err);
          }
        });
      }
    });
  }

  onEdit(compound: Compound): void {
    const dialogRef = this.dialog.open(EditCompoundDialogComponent, {
      width: '500px',
      data: compound
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.compoundService.updateCompound(compound.id.toString(), result).subscribe({
          next: () => {
            this.snackBar.open('Compound updated successfully', 'Close', { duration: 3000 });
            this.loadCompounds(this.pageIndex + 1, this.pageSize);
          },
          error: (err) => {
            this.snackBar.open('Failed to update compound. Please try again.', 'Close', { duration: 3000 });
            console.error('Update compound error:', err);
          }
        });
      }
    });
  }

  onDelete(compound: Compound): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: `Are you sure you want to delete ${compound.name}? This action cannot be undone.` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.compoundService.deleteCompound(compound.id.toString()).subscribe({
          next: () => {
            this.snackBar.open('Compound deleted successfully', 'Close', { duration: 3000 });
            this.loadCompounds(this.pageIndex + 1, this.pageSize);
          },
          error: (err) => {
            this.snackBar.open('Failed to delete compound. Please try again.', 'Close', { duration: 3000 });
            console.error('Delete compound error:', err);
          }
        });
      }
    });
  }

  handleImageError(event: Event): void {
    (event.target as HTMLImageElement).src = '/assets/images/defaultImg.png';
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}