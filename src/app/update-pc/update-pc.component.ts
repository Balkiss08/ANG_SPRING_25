import { Component, OnInit } from '@angular/core';
import { Pc } from '../models/pc.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PcService } from '../services/pc.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Marque } from '../models/marque.model';
import { Image } from '../models/image.model';
@Component({
  selector: 'app-update-pc',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-pc.component.html',
  styles: ``
})
export class UpdatePcComponent implements OnInit {
  currentPc = new Pc();
  marques!: Marque[];
  updatedMarqueId!: number;
  myImage!: string;
  uploadedImage!: File;
  isImageUpdated: Boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,

    private pcService: PcService) { }
  ngOnInit(): void {
    this.pcService.listeMarques().
      subscribe(marq => {
        console.log(marq);
        this.marques = marq._embedded.marques;
      }
      );
    this.pcService.consulterPc(this.activatedRoute.snapshot.params['id']).
      subscribe(ppc => {
        this.currentPc = ppc;
        this.updatedMarqueId = this.currentPc.marque.idMarque;
      });
  }
  /*
updatePc() {
    this.currentPc.marque = this.marques.find(marq => marq.idMarque ==
      this.updatedMarqueId)!;
    //tester si l'image du pc a été modifiée
    if (this.isImageUpdated) {
      this.pcService
        .uploadImage(this.uploadedImage, this.uploadedImage.name)
        .subscribe((img: Image) => {
          this.currentPc.image = img;
          this.pcService
            .updatePc(this.currentPc)
            .subscribe((pcc) => {
              this.router.navigate(['pcs']);
            });
        });
    }
    else {
      this.pcService
        .updatePc(this.currentPc)
        .subscribe((pcc) => {
          this.router.navigate(['pcs']);
        });
    }*/

  updatePc() {
    this.currentPc.marque = this.marques.find(
      (marq) => marq.idMarque == this.updatedMarqueId
    )!;
    this.pcService.updatePc(this.currentPc).subscribe((pcc) => {
      this.router.navigate(['pcs']);
    });
  }
  onAddImagePc() {
    this.pcService
      .uploadImagePc(
        this.uploadedImage,
        this.uploadedImage.name,
        this.currentPc.idPc
      )
      .subscribe((img: Image) => {
        this.currentPc.images.push(img);
      });
  }



  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => { this.myImage = reader.result as string; };
    }
  }

  supprimerImage(img: Image) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.pcService.supprimerImage(img.idImage).subscribe(() => {
        //supprimer image du tableau currentProduit.images
        const index = this.currentPc.images.indexOf(img, 0);
        if (index > -1) {
          this.currentPc.images.splice(index, 1);
        }
        this.currentPc.imagePath = new Date().getTime().toString();
      });
  }




}
