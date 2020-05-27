import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'app-room-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  roomUsers$ = this.roomsService.getUsers(this.roomId);

  constructor(private route: ActivatedRoute, private roomsService: RoomsService) {}

  byIndex(index: number) {
    return index;
  }

  private get roomId() {
    return this.route.snapshot.params.roomId;
  }
}
