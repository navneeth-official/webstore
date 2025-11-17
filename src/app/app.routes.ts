import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Catalogues } from './catalogues/catalogues';
import { Categories } from './categories/categories';
import { Products } from './products/products';
import { Users } from './users/users';

export const routes: Routes = [
    {path:'', redirectTo:'/dashboard', pathMatch:'full'},
    {path:'dashboard', component:Dashboard},
    {path:'catalogues', component:Catalogues},
    {path:'categories', component:Categories},
    {path:'products',component:Products},
    {path:'users',component:Users}
];
