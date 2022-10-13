import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {

  msg: string;
  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  OnPostSubmit(postForm : NgForm){
    let post: Post = {
      userId: postForm.value.userId,
      body: postForm.value.body,
      title: postForm.value.title,
    };

    this.postService.insertPost(post).subscribe(data=>{
      this.msg='Post added to db successfully';
  }, error=>{
    this.msg='Could not add post, Op failed';
  });
}

}
