import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RoomsService } from '../services/rooms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
  message = new FormControl('', Validators.required);

  constructor(
    private router: Router,
    private roomsService: RoomsService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  addMessage() {
    this.roomsService
      .addMessage(this.roomId, {
        text: this.message.value,
        userId: this.userService.getUserId(),
      })
      .subscribe(() => this.message.reset());
  }

  leaveRoom() {
    this.roomsService.removeUser(this.roomId, this.userService.getUserId()).subscribe(() => {
      this.router.navigate(['room']);
    });
  }

  private get roomId() {
    return this.route.snapshot.params.roomId;
  }
}
