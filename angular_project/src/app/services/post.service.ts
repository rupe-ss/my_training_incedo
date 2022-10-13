import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comments } from '../models/comments.model';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts$ = new BehaviorSubject<Post[]>([]);

  constructor(private http: HttpClient) { }

  getAllPOsts():Observable<Post[]> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }

  getCommentsByPostId(postId:number): Observable<Comments[]> {
    return this.http.get<Comments[]>('https://jsonplaceholder.typicode.com/comments?postId=' + postId);
  }

  deletePost(postId: number) : Observable<any> {
     return this.http.delete('https://jsonplaceholder.typicode.com/posts/' + postId);
  }

  insertPost(post: Post) : Observable<Post> {
    return this.http.post<Post>('https://jsonplaceholder.typicode.com/posts', post);
 }
}
