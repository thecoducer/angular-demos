import { Component, OnDestroy, OnInit } from "@angular/core";
import { Post } from "./post.model";
import { PostsService } from "./posts.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  fetchError: string = null;
  postError: string = null;
  postErrorSub: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.getPosts();
  }

  // method binded to send post button in html
  onCreatePost(postForm: NgForm) {
    this.postError = null;

    const postData = postForm.value;
    this.postsService.createAndStorePost(postData.title, postData.content);
    postForm.reset();

    this.postErrorSub = this.postsService.postError.subscribe(errorText => {
      this.postError = errorText;
    })
  }

  // method binded to fetch posts button in html
  onFetchPosts() {
    this.fetchError = null;
    this.isFetching = false;
    this.getPosts();
  }

  // method to get posts
  // receives an observable from the PostsService
  // here we subscribe to it and get the posts data
  private getPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
        console.log(posts);
      },
      (error) => {
        // the second arg of subscribe() returns any error if occurred
        this.fetchError = "Error " + error.status + ": " + error.statusText;
        console.log(error);
      }
    );
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

  ngOnDestroy(): void {
    this.postErrorSub.unsubscribe();
  }
}
