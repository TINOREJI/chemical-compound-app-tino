import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Compound } from '../../models/compound.model';

@Component({
  selector: 'app-edit-compound-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule // Add CommonModule to imports
  ],
  templateUrl: './edit-compound-dialog.component.html',
  styleUrls: ['./edit-compound-dialog.component.scss'],
  animations: []
})
export class EditCompoundDialogComponent {
  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditCompoundDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Compound,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description, Validators.required],
      image: [data.image || '']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value);
    }
  }
}