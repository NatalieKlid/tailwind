import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface Article {
  source: {
    id: string | null,
    name: string
    },
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: Date,
    content: string
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_KEY = 'fdb2119f56674a3ca45805cecf1b8916';
  API_URL = `https://newsapi.org/v2/everything`

  constructor(private http: HttpClient) { }

  getUrl(searchWord: string | null, from: string | null, sortBy: string | null) {
    let url = `${this.API_URL}?`;
    if (searchWord) {
      url = url.concat(`q=${searchWord}&`);
    }
    if (from) {
      url = url.concat(`from=${from}&`);
    }
    if (sortBy) {
      url = url.concat(`sortBy=${sortBy}&`);
    }
    url = url.concat(`apiKey=${this.API_KEY}`);
    return url;
  }

getNews(searchWord: string | null, from: string | null, sortBy: string | null): Observable<NewsResponse>{
  const url = this.getUrl(searchWord, from, sortBy);
  return this.http.get<NewsResponse>(url);
}

}
