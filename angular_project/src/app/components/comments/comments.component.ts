import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comments } from 'src/app/models/comments.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  postid:number;
  comments: Comments[];

  constructor(private actRoute: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    this.postid = this.actRoute.snapshot.params['id'];
    this.postService.getCommentsByPostId(this.postid)
        .subscribe(data=> {
          this.comments = data;
        })
  }

}
