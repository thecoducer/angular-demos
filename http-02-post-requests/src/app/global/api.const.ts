export class FirebaseAPI {
    private static readonly Endpoint: string = 'https://ng-complete-guide-32959-default-rtdb.firebaseio.com/posts.json';

    public static getAPIEndpoint(): string {
        return FirebaseAPI.Endpoint;
    }
}