import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map } from "rxjs/operators";
import { FirebaseAPI } from "./global/api.const";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class PostsService {
  isFetching: boolean = false;
  loadedPosts: Post[];
  // created Subject to broadcast post error data to many subscribers
  // trying out just another way to deal with errors
  postError = new Subject<string>();

  constructor(private http: HttpClient) {}

  /** sends a POST request with post data fetched from html form */
  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };

    this.http
      .post<{ name: string }>(FirebaseAPI.getAPIEndpoint(), postData)
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.postError.next("Error " + error.status + ": " + error.statusText);
        }
      );
  }

  /** sends a GET request and fetches all posts */
  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(FirebaseAPI.getAPIEndpoint())
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      );
  }

  /** sends a DELETE request to delete all posts */
  deletePosts() {
    return this.http.delete(FirebaseAPI.getAPIEndpoint());
  }
}
