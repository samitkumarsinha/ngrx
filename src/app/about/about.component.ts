import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DataService } from '../data.service';
import { User } from '../user';
import { getUserLoaded, getUserLoading, getUsers, RootReducerState } from '../reducers';
import { UserAddAction } from '../actions/user-action';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  userform:FormGroup;
  constructor(private fb: FormBuilder, private ds:DataService, private store: Store<RootReducerState>) {
    this.userform = this.fb.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
   }

  ngOnInit(): void {
    
  }
  submit(data: User){
    this.store.dispatch(new UserAddAction({data}))
    this.ds.postdata(data).subscribe(resp => {
      console.log(resp)
    })
  }

}
