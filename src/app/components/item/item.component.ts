import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  allItems: Item[] = [];
  errorMessage: string = '';

  @ViewChild('itemInput') itemInputRef!: ElementRef;

  addItem(text: string): void {
    if (text.trim() === '') {
      this.errorMessage = 'Por favor, adicione um item.';
      return;
    }
    
    this.errorMessage = ''; 
    const newItem: Item = {
      id: Date.now(),
      name: text.trim(),
      purchased: false
    };
    this.allItems.push(newItem);
    this.itemInputRef.nativeElement.value = '';
    this.updateItemLists();
  }

  deleteItem(id: number): void {
    this.allItems = this.allItems.filter(item => item.id !== id);
    this.updateItemLists();
  }

  togglePurchased(id: number): void {
    const item = this.allItems.find(item => item.id === id);
    if (item) {
      item.purchased = !item.purchased;
    }
    this.updateItemLists();
  }

  private updateItemLists(): void {
    this.unpurchasedItems = this.allItems.filter(item => !item.purchased);
    this.purchasedItems = this.allItems.filter(item => item.purchased);
  }
}
