import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "./post.model";
import { PostsService } from "./posts.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.getPosts();
  }

  // method binded to send post button in html
  onCreatePost(postForm: NgForm) {
    const postData = postForm.value;
    this.postsService.createAndStorePost(postData.title, postData.content);
    postForm.reset();
  }

  // method binded to fetch posts button in html
  onFetchPosts() {
    this.getPosts();
  }

  // method to get posts
  // receives an observable from the PostsService
  // here we subscribe to it and get the posts data
  private getPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe( posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
      console.log(posts);
    })
  }

  // method binded to clear posts button in html
  onClearPosts() {
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  // check whether posts available or not
  postsAvailable() {
    return this.loadedPosts.length > 0;
  }
}
