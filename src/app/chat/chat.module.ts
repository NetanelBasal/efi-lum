import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { MessagesComponent } from './messages/messages.component';
import { UsersComponent } from './users/users.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChatComponent, MessagesComponent, UsersComponent],
  imports: [CommonModule, ChatRoutingModule, ReactiveFormsModule],
})
export class ChatModule {}
