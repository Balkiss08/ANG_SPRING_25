import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Marque } from '../models/marque.model';
import { Pc } from '../models/pc.model';
import { PcService } from '../services/pc.service';

@Component({
  selector: 'app-recherche-par-marque',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recherche-par-marque.component.html',
  styles: ``
})
export class RechercheParMarqueComponent implements OnInit {
  pcs!: Pc[];
  IdMarque!: number;
  marques!: Marque[];

  constructor(private pcService: PcService) { }

  ngOnInit(): void {
    this.pcService.listeMarques().
      subscribe(marq => {
        this.marques = marq._embedded.marques;
        console.log(marq);
      });
  }
  onChange() {
    this.pcService.rechercherParMarque(this.IdMarque).
      subscribe(pccs => { this.pcs = pccs });
  }


}
