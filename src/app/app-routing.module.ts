import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; 


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'courses-admin',
    loadChildren: () => import('./pages/grupo/make-grupo/make-grupo.module').then( m => m.MakeGrupoPageModule)
  },
  {
    path: 'edit-course/:id',
    loadChildren: () => import('./pages/grupo/edit-grupo/edit-grupo.module').then( m => m.EditGrupoPageModule)
  },
  {
    path: 'save-course',
    loadChildren: () => import('./pages/grupo/edit-grupo/edit-grupo.module').then(m => m.EditGrupoPageModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./pages/alumnos/make-alumno/make-alumno.module').then(m => m.MakeAlumnoPageModule)
  },
  {
    path: 'Course/Detail/:id',
    loadChildren: () => import('./pages/alumnos/edit-alumno/edit-alumno.module').then(m => m.EditAlumnoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'We',
    loadChildren: () => import('./pages/info/info.module').then(m => m.InfoPageModule)
  },






  
  {
    path: 'lista/:id',
    loadChildren: () => import('./pages/lista/lista.module').then( m => m.ListaPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
