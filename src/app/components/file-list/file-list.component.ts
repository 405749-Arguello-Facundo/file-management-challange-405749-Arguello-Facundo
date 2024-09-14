import { Component, OnInit } from '@angular/core';
import { FileItem, FileType } from '../../../models/file.item.model';
import { FileService } from '../../services/file.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.css',
})
export class FileListComponent implements OnInit {
  files: FileItem[] = [];
  selectedFiles: string[] = [];
  FileType = FileType;

  constructor(private fileService: FileService) {}

  ngOnInit() {
    this.fileService.getFiles().subscribe((files) => {
      this.files = this.sortFiles(files);
    });
  }

  sortFiles(files: FileItem[]): FileItem[] {
    const folders = files
      .filter((file) => file.type === FileType.FOLDER)
      .sort((a, b) => a.name.localeCompare(b.name));
    const nonFolders = files
      .filter((file) => file.type === FileType.FILE)
      .sort((a, b) => a.name.localeCompare(b.name));
    return [...folders, ...nonFolders];
  }

  toggleSelection(id: string) {
    const index = this.selectedFiles.indexOf(id);
    if (index > -1) {
      this.selectedFiles.splice(index, 1);
    } else {
      this.selectedFiles.push(id);
    }
  }

  deleteSelected() {
    if (this.selectedFiles.length > 1) {
      if (confirm('Borrar estos archivos?')) {
        this.fileService.deleteFiles(this.selectedFiles);
        this.selectedFiles = [];
      }
    } else if (this.selectedFiles.length === 1) {
      this.fileService.deleteFiles(this.selectedFiles);
      this.selectedFiles = [];
    }
  }

  truncateName(name: string): string {
    return name.length > 10 ? name.slice(0, 10) + '...' : name;
  }
}
