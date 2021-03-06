import { initializeApp, storage } from "firebase";
import { firebaseConfig } from "./firebase-config";

export class Firebase {
  static started = false;
  static storage: storage.Storage;

  static init(): void {
    initializeApp(firebaseConfig);
    this.storage = storage();
    this.started = true;
  }

  static upload(path: string, file?: File): storage.UploadTask | undefined {
    if (file) {
      const ref: storage.Reference = this.storage.ref(path);
      return ref.put(file);
    }
  }

  static download(path: string): Promise<string> {
    return this.storage.ref().child(path).getDownloadURL();
  }

  static delete(path?: string): Promise<any> | undefined {
    if (path) {
      return this.storage.ref().child(path).delete();
    }
  }
}
