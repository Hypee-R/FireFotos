import { RouterModule, Routes } from "@angular/router";
import { FotosComponent } from './components/fotos/fotos.component';
import { UploadComponent } from './components/upload/upload.component';

const routes: Routes = [
  {path: 'fotos', component: FotosComponent},
  {path: 'upload', component: UploadComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'fotos' },
];

export const APP_ROUTES = RouterModule.forRoot( routes );
