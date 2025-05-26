import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { CompoundService } from '../../services/compound.service';
import { Compound } from '../../models/compound.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-compound-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './compound-details.component.html',
  styleUrl: './compound-details.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('badgePulse', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
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
export class CompoundDetailsComponent implements OnInit {
  compound: Compound | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private compoundService: CompoundService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCompound(id);
    } else {
      this.error = 'Invalid compound ID';
      this.loading = false;
    }
  }

  loadCompound(id: string): void {
    this.loading = true;
    this.error = null;
    this.compoundService.getCompoundById(id).subscribe({
      next: (compound) => {
        console.log('Compound loaded:', compound);
        this.compound = compound;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load compound. Please try again.';
        console.error('Load compound error:', err);
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  handleImageError(event: Event): void {
    console.warn('Image failed:', (event.target as HTMLImageElement).src);
    (event.target as HTMLImageElement).src = '/assets/images/defaultImg.png';
  }
}