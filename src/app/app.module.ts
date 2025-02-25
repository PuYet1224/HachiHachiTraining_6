import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BadgeModule } from '@progress/kendo-angular-indicators';
import { AvatarModule } from '@progress/kendo-angular-layout';
import { MenuModule } from '@progress/kendo-angular-menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderWideComponent } from './headerwide/headerwide.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PanelBarModule } from '@progress/kendo-angular-layout';
import { Header1Component } from './header1/header1.component';
import { BreadCrumbModule } from '@progress/kendo-angular-navigation';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { Header2Component } from './header2/header2.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { IconsModule } from '@progress/kendo-angular-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { LabelModule } from '@progress/kendo-angular-label';
import { GridWrapperComponent } from './grid-wrapper/grid-wrapper.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { PopupModule } from '@progress/kendo-angular-popup';
import { EditWrapperComponent } from './edit-wrapper/edit-wrapper.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { MultiPopupComponent } from './multi-popup/multi-popup.component';

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}