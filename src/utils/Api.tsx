class Api {
  private _baseUrl: string;

  constructor({ baseUrl }: { baseUrl: string }) {
    this._baseUrl = baseUrl;
  }

  private checkResponse<T>(response: Response): Promise<T> {
    if (response.ok) {
      return response.json() as Promise<T>;
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  getAllCountries(): Promise<any[]> {
    return fetch(`${this._baseUrl}/all`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => this.checkResponse<any[]>(response));
  }

  getCountry(name: string): Promise<any> {
    return fetch(`${this._baseUrl}/name/${name}`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => this.checkResponse<any>(response));
  }
}

const api = new Api({
  baseUrl: "https://restcountries.com/v3.1",
});

export default api;
