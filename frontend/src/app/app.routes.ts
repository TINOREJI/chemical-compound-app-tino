import { Routes } from '@angular/router';
import { CompoundListComponent } from './components/compound-list/compound-list.component';
import { CompoundDetailsComponent } from './components/compound-details/compound-details.component';
import { CompoundEditComponent } from './components/compound-edit/compound-edit.component';
import { AddCompoundDialogComponent } from './components/add-compound-dialog/add-compound-dialog.component';

export const routes: Routes = [
  { path: '', component: CompoundListComponent },
  { path: 'compound/:id', component: CompoundDetailsComponent },
  { path: 'edit', component: CompoundEditComponent },
  { path: '**', redirectTo: '' }
];