import { Component, OnInit } from '@angular/core';
import { Marque } from '../models/marque.model';
import { PcService } from '../services/pc.service';
import { UpdateMarqueComponent } from '../update-marque/update-marque.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liste-marques',
  standalone: true,
  imports: [UpdateMarqueComponent, CommonModule],
  templateUrl: './liste-marques.component.html',
  styles: ``
})
export class ListeMarquesComponent implements OnInit {
  marques!: Marque[];
  ajout: boolean = true;
  updatedMarque: Marque = new Marque();

  constructor(private pcService: PcService) { }
  ngOnInit(): void {
    this.pcService.listeMarques().
      subscribe(marq => {
        this.marques = marq._embedded.marques;
        console.log(marq);
      });
  }
  updateMarque(marq: Marque) {
    this.updatedMarque = marq;
    this.ajout = false;
  }

  marqueUpdated(marq: Marque) {
    console.log("Marque updated event", marq);
    this.pcService.ajouterMarque(marq).
      subscribe(() => this.chargerMarques());
  }
  chargerMarques() {
    this.pcService.listeMarques().
      subscribe(marq => {
        this.marques = marq._embedded.marques;
        console.log(marq);
      });
  }

}
