import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts:Post[];

  constructor(private PostService: PostService) { }

  ngOnInit(): void {
    this.PostService.getAllPOsts().subscribe(data=> {
      this.posts = data;
      this.PostService.posts$.next(this.posts);
    });
  }

  deletePost(postId: number){
    this.PostService.deletePost(postId).subscribe(data => {
      this.posts = this.posts.filter(p=> p.id != postId);
      this.PostService.posts$.next(this.posts);
    });
  }

}
