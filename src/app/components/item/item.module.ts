import { Component, ViewChild, ElementRef } from '@angular/core';

interface Item {
  id: number;
  name: string;
  purchased: boolean;
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  allItems: Item[] = [];
  unpurchasedItems: Item[] = [];
  purchasedItems: Item[] = [];

  @ViewChild('itemInput') itemInputRef!: ElementRef;

  addItem(text: string): void {
    if (text.trim() !== '') {
      const newItem: Item = {
        id: Date.now(),
        name: text.trim(),
        purchased: false
      };
      this.allItems.push(newItem);
      this.itemInputRef.nativeElement.value = '';
      this.updateItemLists();
    }
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
