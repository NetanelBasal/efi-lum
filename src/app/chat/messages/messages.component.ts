import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RoomsService } from '../../services/rooms.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-room-messages',
  templateUrl: './messages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  room$ = this.roomsService.getRoom(this.roomId);
  messages$ = this.roomsService.getMessages(this.roomId);
  user$ = this.userService.selectUser$;

  constructor(
    private roomsService: RoomsService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  byIndex(index: number) {
    return index;
  }

  private get roomId() {
    return this.route.snapshot.params.roomId;
  }
}
