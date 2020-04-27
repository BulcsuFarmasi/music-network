export class Http {
  static baseUrl: string = "https://music-network-d3a77.firebaseio.com/";

  static GET: string = "GET";
  static POST: string = "POST";
  static DELETE: string = "DELETE";

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

  static delete(path: string): Promise<Response> {
    return fetch(this.baseUrl + path, {
      method: this.DELETE,
    });
  }
}
