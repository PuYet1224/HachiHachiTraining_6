import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BadgeModule, IndicatorsModule } from '@progress/kendo-angular-indicators';
import { AvatarModule, PanelBarModule, LayoutModule } from '@progress/kendo-angular-layout';
import { MenuModule } from '@progress/kendo-angular-menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderWideComponent } from './headerwide/headerwide.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Header1Component } from './HoSoNhanSu/header1/header1.component';
import { BreadCrumbModule, NavigationModule } from '@progress/kendo-angular-navigation';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { Header2Component } from './HoSoNhanSu/header2/header2.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { IconsModule } from '@progress/kendo-angular-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabelModule } from '@progress/kendo-angular-label';
import { GridWrapperComponent } from './HoSoNhanSu/grid-wrapper/grid-wrapper.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { PopupModule } from '@progress/kendo-angular-popup';
import { EditWrapperComponent } from './HoSoNhanSu/edit-wrapper/edit-wrapper.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { MultiPopupComponent } from './HoSoNhanSu/multi-popup/multi-popup.component';
import { HttpClientModule } from '@angular/common/http';
import { PagerModule } from '@progress/kendo-angular-pager';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { PhanQuyenHeader1Component } from './PhanQuyen/header1/header1.component'; 
import { PhanQuyenHeader2Component } from './PhanQuyen/header2/header2.component'; 
import { TreeListWrapperComponent } from './PhanQuyen/treelist-wrapper/treelist-wrapper.component';
import { TreeListModule } from '@progress/kendo-angular-treelist';
import { MultiSelectModule } from '@progress/kendo-angular-dropdowns';
import { TooltipDirective } from './PhanQuyen/directives/tooltip.directive';
import { GroupByAlphabetPipe } from './PhanQuyen/pipes/groupbyalphabet.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HeaderWideComponent,
    SidebarComponent,
    Header1Component,
    Header2Component,
    GridWrapperComponent,
    EditWrapperComponent,
    MultiPopupComponent,
    PhanQuyenHeader1Component,
    PhanQuyenHeader2Component,
    TreeListWrapperComponent,
    TooltipDirective,
    GroupByAlphabetPipe
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ToolBarModule,
    ButtonsModule,
    BadgeModule,
    AvatarModule,
    MenuModule,
    BrowserAnimationsModule,
    PanelBarModule,
    BreadCrumbModule,
    DropDownsModule,
    InputsModule,
    IconsModule,
    LabelModule,
    GridModule,
    PopupModule,
    DateInputsModule,
    LayoutModule,
    HttpClientModule,
    PagerModule,
    DialogModule,
    NotificationModule,
    IndicatorsModule,
    NavigationModule,
    TreeListModule,
    MultiSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
