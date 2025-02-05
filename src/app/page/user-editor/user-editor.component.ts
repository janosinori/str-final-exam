import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {

  /**
   * user$ {Observable<User>}
   * Can be two different type of User:
   * 1. If the params.id is 0: new User().
   * 2. If the params.id isn't 0: a user from the database based on its id.
   */
  user$: Observable<User> = this.activatedRoute.params.pipe(
    switchMap( params => {
      if (Number(params.id) === 0) {
        return of(new User());
      }

      return this.userService.get(Number(params.id));
    })
  );

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  saveItem(user: User): void {
    if (user.id) {
      this.userService.update(user).subscribe(
      () => {
        this.userService.getAll();
      });
    }
    else{
      this.userService.add(user).subscribe(
        () => {
          this.userService.getAll();
        }
      );
    }
    this.router.navigate(['']);
  }

  user: User = new User;

  onFormSubmit(form: NgForm): void{
    if (!form.valid) {
      alert('Nem megfelelő kitöltés')
      return;
    }
    this.saveItem(this.user);
  }
}
