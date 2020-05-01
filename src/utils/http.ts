export class Http {
  private static baseUrl: string =
    "https://music-network-d3a77.firebaseio.com/";

  private static DELETE: string = "DELETE";
  private static GET: string = "GET";
  private static POST: string = "POST";

  static delete(path: string): Promise<Response> {
    return fetch(this.baseUrl + path, {
      method: this.DELETE,
    });
  }

  static get(path: string): Promise<Response> {
    return fetch(this.baseUrl + path, {
      method: this.GET,
    });
  }

  static post(path: string, body: string): Promise<Response> {
    return fetch(this.baseUrl + path, {
      method: this.POST,
      body,
    });
  }
}
