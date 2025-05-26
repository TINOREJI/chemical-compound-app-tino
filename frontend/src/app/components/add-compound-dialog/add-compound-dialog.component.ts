import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-compound-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './add-compound-dialog.component.html',
  styleUrls: ['./add-compound-dialog.component.scss'],  
  animations: [
    // Add any animations here if needed
  ]
})
export class AddCompoundDialogComponent {
  addForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddCompoundDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: ['']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.addForm.valid) {
      this.dialogRef.close(this.addForm.value);
    }
  }
}