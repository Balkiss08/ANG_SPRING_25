import { Routes } from '@angular/router';
import { PcsComponent } from './pcs/pcs.component';
import { AddPcComponent } from './add-pc/add-pc.component';
import { UpdatePcComponent } from './update-pc/update-pc.component';
import { RechercheParMarqueComponent } from './recherche-par-marque/recherche-par-marque.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeMarquesComponent } from './liste-marques/liste-marques.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { pcGuard } from './services/pc.guard';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';
export const routes: Routes = [
    { path: "pcs", component: PcsComponent },
    { path: "", redirectTo: "pcs", pathMatch: "full" },
    { path: "updatePc/:id", component: UpdatePcComponent },
    { path: "rechercheParMarque", component: RechercheParMarqueComponent },
    { path: "rechercheParNom", component: RechercheParNomComponent },
    { path: "listeMarques", component: ListeMarquesComponent },
    { path: 'login', component: LoginComponent },
    { path: 'app-forbidden', component: ForbiddenComponent },
    { path: "add-pc", component: AddPcComponent, canActivate: [pcGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'verifEmail', component: VerifEmailComponent },
    
];