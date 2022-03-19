import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

const MATERIALS = [
    MatInputModule
  , MatIconModule
  , MatListModule
  , MatToolbarModule
  , MatCardModule
  , MatButtonModule
];

@NgModule({
  declarations: [],
  imports: MATERIALS,
  exports: MATERIALS
})
export class MaterialModule { }
