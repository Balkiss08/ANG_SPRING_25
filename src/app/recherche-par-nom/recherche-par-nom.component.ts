import { Component, OnInit } from '@angular/core';
import { Pc } from '../models/pc.model';
import { PcService } from '../services/pc.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchFilterPipe } from '../search-filter.pipe';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [FormsModule, CommonModule, SearchFilterPipe],
  templateUrl: './recherche-par-nom.component.html',
  styles: ``
})
export class RechercheParNomComponent implements OnInit {
  nomPc!: string;
  pcs!: Pc[];
  allPcs!: Pc[];
  searchTerm!: string;
  constructor(private pcService: PcService) { }

  ngOnInit(): void {
    this.pcService.listePcs().subscribe(pccs => {
      console.log(pccs);
      this.pcs = pccs;
    });

  }
  onKeyUp(filterText: string) {
    this.pcs = this.allPcs.filter(item =>
      item.nomPc.toLowerCase().includes(filterText));
  }
  rechercherPcs() {
    if (this.nomPc)
      this.pcService.rechercherParNom(this.nomPc).
        subscribe(pccs => {
          console.log(pccs);
          this.pcs = pccs;
        });
    else
      this.pcService.listePcs().subscribe((pccs) => {
        console.log(pccs);
        this.pcs = pccs;
      });
  }
}