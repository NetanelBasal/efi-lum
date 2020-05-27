import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RoomComponent],
  imports: [CommonModule, RoomRoutingModule, ReactiveFormsModule],
})
export class RoomModule {}
