import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  name = new FormControl('', Validators.required);

  constructor(private userService: UserService, private router: Router) {}

  join() {
    this.userService.create(this.name.value).subscribe({
      next: () => this.router.navigate(['room']),
      error: () => alert('Some error message'),
    });
  }
}
