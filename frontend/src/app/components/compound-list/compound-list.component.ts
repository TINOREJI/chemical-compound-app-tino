import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { CompoundService } from '../../services/compound.service';
import { Compound } from '../../models/compound.model';
import { CommonModule } from '@angular/common';
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
    RouterLink
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
  totalCompounds = 0;
  pageSize = 10; // Fixed size
  pageIndex = 0;
  loading = true;
  error: string | null = null;

  constructor(private compoundService: CompoundService) {}

  ngOnInit(): void {
    this.loadCompounds();
  }

  loadCompounds(): void {
    this.loading = true;
    this.error = null;
    const page = this.pageIndex + 1; // Backend expects 1-based page
    console.log(`Loading page ${page}, limit ${this.pageSize}`); // Debug
    this.compoundService.getCompounds(page, this.pageSize).subscribe({
      next: (response) => {
        console.log('Compounds loaded:', response);
        this.compounds = response.compounds || [];
        this.totalCompounds = response.total || 0;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load compounds. Please try again later.';
        console.error('Load compounds error:', err);
        this.loading = false;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    console.log('Page change:', event); // Debug
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCompounds();
  }

  handleImageError(event: Event, compoundName: string): void {
    console.warn(`Image failed for ${compoundName}:`, (event.target as HTMLImageElement).src); 
    (event.target as HTMLImageElement).src = '/assets/images/placeholder.png';
  }
}