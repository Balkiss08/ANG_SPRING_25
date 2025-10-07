import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Marque } from '../models/marque.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-marque',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-marque.component.html',
  styles: ``
})
export class UpdateMarqueComponent {
  @Input()
  marque!: Marque;

  @Output()
  marqueUpdated = new EventEmitter<Marque>();

  @Input()
  ajout!: boolean;

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateMarque ", this.marque);
  }

  saveMarque() {
    this.marqueUpdated.emit(this.marque);
  }
}
