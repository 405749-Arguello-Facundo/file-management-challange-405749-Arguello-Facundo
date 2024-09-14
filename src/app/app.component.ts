import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileItem } from '../models/file.item.model';
import { FILE_LIST } from '../data/file.storage';
import { FileListComponent } from './components/file-list/file-list.component';
import { NewFileFormComponent } from './components/new-file-form/new-file-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FileListComponent, NewFileFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  files: FileItem[] = FILE_LIST;
  title = 'file-management';
}
