import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Pc } from '../models/pc.model';
import { PcService } from '../services/pc.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pcs',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './pcs.component.html',
  styleUrls: ['./pcs.component.css']
})
export class PcsComponent implements OnInit {
  pcs: Pc[] = [];
  apiurl: string = 'http://localhost:8083/pcs/api';

  constructor(private pcService: PcService, public authService: AuthService) {
    // this.pcs = pcService.listePcs();
  }
  chargerPcs() {
    this.pcService.listePcs().subscribe(pccs => {
      this.pcs = pccs;
    });


  }


  supprimerPc(p1: Pc) {

    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.pcService.supprimerPc(p1.idPc).subscribe(() => {
        console.log("pc supprimé");
        this.chargerPcs();
      });
  }
  ngOnInit(): void {
    this.chargerPcs();
    /*this.pcService.listePcs().subscribe(pccs => {
      console.log(pccs);
      this.pcs = pccs;
    });*/
    /* this.pcService.listePcs().subscribe({
       next: (data) => {
         this.pcs = data;
         console.log('PCs chargés:', this.pcs);
       },
       error: (err) => {
         console.error('Erreur:', err);
       }
     });*/

  }


}
