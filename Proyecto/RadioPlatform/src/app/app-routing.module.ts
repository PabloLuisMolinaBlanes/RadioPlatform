import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'tab6',
    loadChildren: () => import('./tab6/tab6.module').then( m => m.Tab6PageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'antenna-crudpage',
    loadChildren: () => import('./antenna-crudpage/antenna-crudpage.module').then( m => m.AntennaCRUDPagePageModule)
  },
  {
    path: 'radio-set-crudpage',
    loadChildren: () => import('./radio-set-crudpage/radio-set-crudpage.module').then( m => m.RadioSetCRUDPagePageModule)
  },
  {
    path: 'contact-crudpage',
    loadChildren: () => import('./contact-crudpage/contact-crudpage.module').then( m => m.ContactCRUDPagePageModule)
  },
  {
    path: 'pricecalculator',
    loadChildren: () => import('./pricecalculator/pricecalculator.module').then( m => m.PricecalculatorPageModule)
  },
  {
    path: 'tab7',
    loadChildren: () => import('./tab7/tab7.module').then( m => m.Tab7PageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
