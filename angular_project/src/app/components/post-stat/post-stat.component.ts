import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-stat',
  templateUrl: './post-stat.component.html',
  styleUrls: ['./post-stat.component.css']
})
export class PostStatComponent implements OnInit {

  posts:Post[];
  totalPosts:number;

  constructor(private PostService: PostService) { }

  ngOnInit(): void {
    // this.PostService.getAllPOsts().subscribe(data=> {
    //   this.totalPosts = data.length;
    // })
    this.PostService.posts$.subscribe(data=> {
      this.totalPosts = data.length;
    })
  }

}
