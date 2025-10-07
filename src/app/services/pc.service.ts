import { Injectable } from '@angular/core';
import { Pc } from '../models/pc.model';
import { Marque } from '../models/marque.model';
import { Image } from '../models/image.model';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MarqueWrapper } from '../models/marqueWrapped.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class PcService {
  apiURL: string = 'http://localhost:8083/pcs/api/pcs';
  apiURLMarque: string = 'http://localhost:8083/pcs/api/marques';
  apiURLImage: string = 'http://localhost:8083/pcs/api/image';

  pcs!: Pc[];
  pc!: Pc;
  marques!: Marque[];
  constructor(private http: HttpClient, private authService: AuthService) {


  }
  listePcs(): Observable<Pc[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })

    return this.http.get<Pc[]>(this.apiURL + "/all", { headers: httpHeaders });

  }

  ajouterPc(pcc: Pc): Observable<Pc> {
    /*let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })*/
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<Pc>(this.apiURL + "/addpc", pcc, { headers: httpHeaders });
  }
  supprimerPc(id: number) {
    const url = `${this.apiURL}/delpc/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.delete(url);
  }
  consulterPc(id: number): Observable<Pc> {
    const url = `${this.apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Pc>(url);
  }
  updatePc(pcc: Pc): Observable<Pc> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.put<Pc>(this.apiURL + "/updatepc", pcc);
  }
  listeMarques(): Observable<MarqueWrapper> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<MarqueWrapper>(this.apiURLMarque
    );
  }
  rechercherParMarque(idMarque: number): Observable<Pc[]> {
    const url = `${this.apiURL}/pcsmarq/${idMarque}`;
    return this.http.get<Pc[]>(url);
  }
  rechercherParNom(nom: string): Observable<Pc[]> {
    const url = `${this.apiURL}/pcsByName/${nom}`;
    return this.http.get<Pc[]>(url);
  }
  ajouterMarque(marq: Marque): Observable<Marque> {
    return this.http.post<Marque>(this.apiURLMarque, marq, httpOptions);
  }

  uploadImage(file: File, filename: string): Observable<Image> {
    const formData = new FormData();
    formData.append('image', file, filename);
    const url = `${this.apiURLImage}/upload`;
    return this.http.post<Image>(url, formData);
  }
  loadImage(id: number): Observable<Image> {
    const url = `${this.apiURLImage}/get/info/${id}`;
    return this.http.get<Image>(url);
  }
  /*
  uploadImagePc(file: File, filename: string, idPc: number): Observable<any> {
    const formData = new FormData();
    formData.append('image', file, filename);
    const url = `${this.apiURLImage}/uploadImagePc/${idPc}`;
    return this.http.post(url, formData);
  }
  supprimerImage(id: number) {
    const url = `${this.apiURLImage}/delete/${id}`;
    return this.http.delete(url);
  }
  uploadImageFS(file: File, filename: string, idPc: number): Observable<any> {
    const formData = new FormData();
    formData.append('image', file, filename);
    const url = `${this.apiURLImage}/uploadFS/${idPc}`;
    return this.http.post(url, formData);
  }
*/
  uploadImagePc(file: File, filename: string, idPc: number): Observable<Image> {
    const formData = new FormData();
    formData.append('image', file, filename);
    const url = `${this.apiURLImage}/uploadImagePc/${idPc}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.post<Image>(url, formData, { headers: httpHeaders });
  }

  supprimerImage(id: number): Observable<Pc> {
    const url = `${this.apiURLImage}/delete/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.delete<Pc>(url, { headers: httpHeaders });
  }

  uploadImageFS(file: File, filename: string, idPc: number): Observable<Pc> {
    const formData = new FormData();
    formData.append('image', file, filename);
    const url = `${this.apiURLImage}/uploadFS/${idPc}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.post<Pc>(url, formData, { headers: httpHeaders });
  }
}
