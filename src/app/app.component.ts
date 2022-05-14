import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
// import { Post } from './posts/Post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // storedposts: Post[] = []

  // onPostadded(post){
  //   this.storedposts.push(post)
  // }
  constructor(private authService: AuthService){

  }
  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
