import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RoomsService } from '../services/rooms.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomComponent {
  roomName = new FormControl('', Validators.required);
  rooms$ = this.roomsService.getAll();

  constructor(
    private router: Router,
    private roomsService: RoomsService,
    private userService: UserService
  ) {}

  joinRoom(roomId: number) {
    this.roomsService.addUser(roomId, this.userService.getUserId()).subscribe(() => {
      this.router.navigate([`chat/${roomId}`]);
    });
  }

  createRoom() {
    this.roomsService
      .createRoom(this.roomName.value)
      .pipe(
        mergeMap(({ roomId }) => {
          return this.roomsService
            .addUser(roomId, this.userService.getUserId())
            .pipe(map(() => roomId));
        })
      )
      .subscribe(roomId => this.router.navigate([`chat/${roomId}`]));
  }

  byIndex(index: number) {
    return index;
  }
}
