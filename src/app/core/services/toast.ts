import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class Toast {

  constructor(private messageService: MessageService) { }

  showError(message: string): void {
    this.messageService.add({severity: 'error', summary: 'Error', detail: message, life: 2000})
  }

  showSuccess(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: message,
      life: 2000
    });
  }
}
