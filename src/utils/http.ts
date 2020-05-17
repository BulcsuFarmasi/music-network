export class Http {
  private static baseUrl: string;

  private static databaseUrl: string =
    "https://music-network-d3a77.firebaseio.com/";
  private static authUrl: string =
    "https://identitytoolkit.googleapis.com/v1/accounts:";

  private static DELETE: string = "DELETE";
  private static GET: string = "GET";
  private static POST: string = "POST";

  static delete(path: string): Promise<Response> {
    return fetch(this.baseUrl + path, {
      method: this.DELETE,
    }).then(this.processResponse);
  }

  static get(path: string): Promise<Response> {
    return fetch(this.baseUrl + path, {
      method: this.GET,
    }).then(this.processResponse);
  }

  static post(path: string, body: string): Promise<Response> {
    return fetch(this.baseUrl + path, {
      method: this.POST,
      body,
    }).then(this.processResponse);
  }

  static setAuthUrl() {
    if (this.baseUrl !== this.authUrl) {
      this.baseUrl = this.authUrl;
    }
  }

  static setDatabaseUrl() {
    if (this.baseUrl !== this.databaseUrl) {
      this.baseUrl = this.databaseUrl;
    }
  }

  private static processResponse(response: Response): Promise<Response> {
    if (!response.ok) {
      return Promise.reject(response);
    }
    return Promise.resolve(response);
  }
}
