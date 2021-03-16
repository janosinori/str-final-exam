import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$: Observable<User[]> = this.userService.getAll();

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }
 
  deleteItem(id: number): void {
    this.userService.remove(id).subscribe(
      () => {
        this.userService.getAll();
      }
    );
  }

  updateItem(user: User): void {
    this.userService.update(user).subscribe(
      () => {
        this.userService.getAll();
      }
    );
  }

  createItem(user: User): void {
    this.userService.add(user).subscribe(
      () => {
        this.userService.getAll();
      }
    );
  }

 subscribeForDeleteItem: User = new User();

   subscribeForDelete(user:User): void{
    this.subscribeForDeleteItem = user;
    const r=confirm("Biztos abban, hogy kitörli?");
    if (r == true){
      this.delete();
    }
  }

  delete(): void{
   this.userService.remove(this.subscribeForDeleteItem.id);
  }

  phrase: string = '';
  key: string = 'name';
  order: string = '';
  
 onChangePhrase(event: Event):void {
    this.phrase = (event.target as HTMLInputElement).value;
  }
  onChangeKey(event: Event):void {
    this.key = (event.target as HTMLInputElement).value;
    this.phrase = '';
  }
  onChangeOrder(event: Event):void {
    this.order = (event.target as HTMLInputElement).value;
  }

  changeOrder(key:string):void {
    this.order = key;
  }
}

