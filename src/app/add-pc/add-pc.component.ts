import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pc } from '../models/pc.model';
import { PcService } from '../services/pc.service';
import { Marque } from '../models/marque.model';
import { Image } from '../models/image.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-pc',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-pc.component.html',
  styleUrls: ['./add-pc.component.css']
})
export class AddPcComponent implements OnInit {
  marques!: Marque[];
  newIdMarque!: number;
  newMarque!: Marque;
  newPc = new Pc();
  uploadedImage!: File;
  imagePath: any;
  constructor(private pcService: PcService, private router: Router) { }

  ngOnInit(): void {
    this.pcService.listeMarques().
      subscribe(marq => {
        this.marques = marq._embedded.marques;
        console.log("Marques reçues :", this.marques);
      });
  }
  /*
    addPc() {
      const selectedMarque = this.marques.find(marq => marq.idMarque == this.newIdMarque);
      if (!selectedMarque) return; // stop si marque non trouvée
  
      this.newPc.marque = selectedMarque;
  
      this.pcService.ajouterPc(this.newPc).subscribe(pcc => {
        if (this.uploadedImage) {
          this.pcService.uploadImagePc(this.uploadedImage, this.uploadedImage.name, pcc.idPc)
            .subscribe((img: Image) => {
              if (!pcc.images) pcc.images = [];
              pcc.images.push(img);
              pcc.image = img;
              this.pcService.updatePc(pcc).subscribe(() => {
                this.router.navigate(['pcs']); // redirection après update
              });
            });
        } else {
          this.router.navigate(['pcs']);
        }
      });
    }*/
  /*  addPc() {
      this.newPc.marque = this.marques.find(marq => marq.idMarque == this.newIdMarque)!;
      this.pcService.ajouterPc(this.newPc).subscribe((pcc) => {
  
        this.pcService.uploadImageFS(this.uploadedImage, this.uploadedImage.name, pcc.idPc).subscribe((response: any) => { });
  
        this.router.navigate(['pcs']);
      });
    }*/
  addPc() {
    this.newPc.marque = this.marques.find(marq => marq.idMarque == this.newIdMarque)!;
    this.pcService.ajouterPc(this.newPc).subscribe((pcc) => {
      // Ajouter l'image dans la base de données
      if (this.uploadedImage) {
        this.pcService.uploadImagePc(this.uploadedImage, this.uploadedImage.name, pcc.idPc)
          .subscribe((img: Image) => {
            this.router.navigate(['pcs']);
          });
      } else {
        this.router.navigate(['pcs']);
      }
    });
  }
  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
  }
}

