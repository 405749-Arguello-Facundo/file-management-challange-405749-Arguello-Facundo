import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormArray,
} from '@angular/forms';
import { FileItem, FileOwner, FileType } from '../../../models/file.item.model';
import { FileService } from '../../services/file.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-file-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './new-file-form.component.html',
  styleUrl: './new-file-form.component.css',
})
export class NewFileFormComponent implements OnInit {
  fileForm!: FormGroup;
  folders: FileItem[] = [];
  owners: FileOwner[] = [];
  FileType = FileType;

  constructor(private fb: FormBuilder, private fileService: FileService) {}

  ngOnInit() {
    this.fileForm = this.fb.group({
      name: ['', Validators.required],
      type: [FileType.FILE, Validators.required],
      parentId: [''],
      owners: [''],
    });

    this.folders = this.fileService.getFolders();
    this.owners = this.fileService.getOwners();
  }

  onSubmit() {
    if (this.fileForm.valid) {
      const newFile: FileItem = {
        id: Date.now().toString(),
        name: this.fileForm.value.name,
        type: this.fileForm.value.type,
        creation: new Date(),
        owners: this.fileForm.value.owners
          ? this.fileForm.value.owners.map((id: string) =>
              this.owners.find((owner) => owner.name === id)
            )
          : [],
        parentId: this.fileForm.value.parentId || undefined,
      };
      this.fileService.addFile(newFile);
      this.fileForm.reset({ type: FileType.FILE });
    }
  }
}
