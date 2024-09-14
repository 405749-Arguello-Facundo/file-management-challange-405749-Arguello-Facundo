import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FileItem, FileOwner, FileType } from '../../models/file.item.model';
import { FILE_LIST, OWNERS } from '../../data/file.storage';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private files: FileItem[] = FILE_LIST;
  private filesSubject = new BehaviorSubject<FileItem[]>(this.files);

  getFiles(): Observable<FileItem[]> {
    return this.filesSubject.asObservable();
  }

  addFile(file: FileItem): void {
    this.files.push(file);
    this.filesSubject.next(this.files);
  }

  deleteFiles(ids: string[]): void {
    this.files = this.files.filter((file) => !ids.includes(file.id));
    this.filesSubject.next(this.files);
  }

  getOwners(): FileOwner[] {
    return OWNERS;
  }

  getFolders(): FileItem[] {
    return this.files.filter((file) => file.type === FileType.FOLDER);
  }
}
