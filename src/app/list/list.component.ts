import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { UserListRequestAction, UserListSuccessAction } from '../actions/user-action';
import { DataService } from '../data.service';
import { getUserLoaded, getUserLoading, getUsers, RootReducerState } from '../reducers';
import { User } from '../user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  subscribtion: Subscription | undefined;
  constructor(private ds: DataService, private store: Store<RootReducerState>) { }

  ngOnInit(): void {
    this.fetchdata();
  }
  fetchdata(){
    const loading$ = this.store.select(getUserLoading);
    const loaded$ = this.store.select(getUserLoaded);
    const getUserData = this.store.select(getUsers);
    combineLatest([loading$, loaded$]).subscribe(data => {
      // loaded$.subscribe(x => console.log(x))
      if(!data[0] && !data[1]){
        this.store.dispatch(new UserListRequestAction())
        this.ds.getdata().subscribe((data) => {
          console.log("first time only", data)
          this.store.dispatch(new UserListSuccessAction({data}))
        })
      }
    });

    getUserData.subscribe(item => {
      console.log(item)
    })
  }
}
