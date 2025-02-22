import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridWrapperComponent } from './grid-wrapper/grid-wrapper.component';
import { EditWrapperComponent } from './edit-wrapper/edit-wrapper.component';

const routes: Routes = [
  { path: '', component: GridWrapperComponent },
  { path: 'edit-page', component: EditWrapperComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
