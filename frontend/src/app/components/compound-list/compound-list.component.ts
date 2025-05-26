import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input'; // For search input
import { MatFormFieldModule } from '@angular/material/form-field'; // For search input
import { MatSelectModule } from '@angular/material/select'; // For sort dropdown
import { RouterLink } from '@angular/router';
import { CompoundService } from '../../services/compound.service';
import { Compound } from '../../models/compound.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // For ngModel
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-compound-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './compound-list.component.html',
  styleUrl: './compound-list.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class CompoundListComponent implements OnInit {
  compounds: Compound[] = []; 
  displayedCompounds: Compound[] = []; 
  totalCompounds = 0; 
  pageSize = 10;
  pageIndex = 0;
  loading = true;
  error: string | null = null;
  imagePlaceholder: string;
  searchTerm: string = ''; 
  sortOrder: 'asc' | 'desc' | '' = ''; 
  allCompounds: Compound[] = []; 

  constructor(private compoundService: CompoundService) {
    this.imagePlaceholder = '/assets/images/placeholder.png';
  }

  ngOnInit(): void {
    this.loadCompounds();
  }

  loadCompounds(): void {
    this.loading = true;
    this.error = null;
    const page = this.pageIndex + 1;
    console.log(`Loading page ${page}, limit ${this.pageSize}`);

    this.compoundService.getCompounds(1, 1000).subscribe({
      next: (response) => {
        console.log('Compounds loaded:', response);
        this.allCompounds = response.compounds || [];
        this.applyFiltersAndSort();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load compounds. Please try again later.';
        console.error('Load compounds error:', err);
        this.loading = false;
      }
    });
  }

  applyFiltersAndSort(): void {
    let filteredCompounds = [...this.allCompounds];

    // Apply search filter
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.trim().toLowerCase();
      filteredCompounds = filteredCompounds.filter(compound =>
        compound.name.toLowerCase().includes(term)
      );
    }

    // Apply sort
    if (this.sortOrder) {
      filteredCompounds.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (this.sortOrder === 'asc') {
          return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        } else {
          return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
        }
      });
    }

    this.totalCompounds = filteredCompounds.length;

    const startIndex = this.pageIndex * this.pageSize;
    this.displayedCompounds = filteredCompounds.slice(startIndex, startIndex + this.pageSize);
  }

  onSearchChange(): void {
    this.pageIndex = 0; // Reset to first page on search
    this.applyFiltersAndSort();
  }

  onSortChange(): void {
    this.pageIndex = 0; // Reset to first page on sort
    this.applyFiltersAndSort();
  }

  onPageChange(event: PageEvent): void {
    //console.log('Page change:', event);
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyFiltersAndSort();
  }

  handleImageError(event: Event, compoundName: string): void {
    console.warn(`Image failed for ${compoundName}:`, (event.target as HTMLImageElement).src);
    (event.target as HTMLImageElement).src = '/assets/images/placeholder.png';
  }
}