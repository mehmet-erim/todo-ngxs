import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { NotifyState } from 'src/app/states/notify.state';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { GetUserData } from 'src/app/actions/notify.action';

@Component({
  selector: 'notify-app',
  templateUrl: './notify.component.html',
  styleUrls: ['notify.component.css']
})

export class NotifyComponent implements  OnInit {

    @Select(NotifyState.getNotify)
    message$: Observable<any>;


    constructor(private store: Store, private u:UserService){}

    ngOnInit(){

    }

   

    getData() {
      this.store.dispatch(new GetUserData());
    }

  
}