import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridWrapperComponent } from './HoSoNhanSu/grid-wrapper/grid-wrapper.component';
import { EditWrapperComponent } from './HoSoNhanSu/edit-wrapper/edit-wrapper.component';
import { TreeListWrapperComponent } from './PhanQuyen/treelist-wrapper/treelist-wrapper.component';

const routes: Routes = [
  { path: '', component: GridWrapperComponent },
  { path: 'phan-quyen-tree', component: TreeListWrapperComponent },
  { path: 'edit-page', component: EditWrapperComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
