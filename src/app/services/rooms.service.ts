import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { poll } from '../operators/poll';
import { UserService } from './user.service';
import { combineLatest } from 'rxjs';

type Room = { id: number; name: string };
type RoomInfo = {
  name: string;
  textCount: number;
  usersCount: number;
};
type Message = { userId: number; text: string };

@Injectable({ providedIn: 'root' })
export class RoomsService {
  constructor(private http: HttpClient, private userService: UserService) {}

  getAll() {
    return this.http.get<Room[]>(`${environment.baseUrl}/rooms`);
  }

  createRoom(name: string) {
    return this.http.post<{ roomId: number }>(`${environment.baseUrl}/rooms`, { name });
  }

  getRoom(roomId: number) {
    return this.http.get<RoomInfo>(`${environment.baseUrl}/rooms/${roomId}`);
  }

  addUser(roomId: number, userId: number) {
    return this.http.post<string>(
      `${environment.baseUrl}/rooms/${roomId}/users`,
      { userId },
      { responseType: 'text' as 'json' }
    );
  }

  removeUser(roomId: string, userId: number) {
    return this.http.delete(`${environment.baseUrl}/rooms/${roomId}/users/${userId}`, {
      responseType: 'text' as 'json',
    });
  }

  addMessage(roomId: number, msg: { text: string; userId: number }) {
    return this.http.post<string>(`${environment.baseUrl}/rooms/${roomId}/text`, msg, {
      responseType: 'text' as 'json',
    });
  }

  // A SIDE NOTE:
  // In reality I would NEVER make such a design
  // We need always fetch all users to get the new names
  getUsers(roomId: number) {
    const EVERY_SECOND = 1000;

    const roomUsers$ = this.http.get<{ users: number[] }>(
      `${environment.baseUrl}/rooms/${roomId}/users`
    );

    return combineLatest([this.userService.getUsers(), roomUsers$]).pipe(
      poll(EVERY_SECOND),
      map(([allUsers, { users }]) => users.map(id => allUsers[id]))
    );
  }

  getMessages(roomId: number) {
    const EVERY_HALF_SECOND = 500;

    const messages$ = this.http.get<{ text: Message[] }>(
      `${environment.baseUrl}/rooms/${roomId}/text`
    );

    return combineLatest([this.userService.getUsers(), messages$]).pipe(
      poll(EVERY_HALF_SECOND),
      map(([allUsers, messages]) => {
        return messages.text.map(({ userId, text }) => {
          return {
            text,
            user: {
              userId,
              name: allUsers[userId],
            },
          };
        });
      })
    );
  }
}
