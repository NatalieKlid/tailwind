import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ApiService, Source } from 'src/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  sources: Source[] = [];

  categories = new Set();

  constructor(private api: ApiService) {

  }

  ngOnInit(): void {
    this.api.getSources().pipe(take(1)).subscribe(response => {
      const sourceSet = new Set();
      response.sources.filter(el => el.language === 'en').forEach(element => {
        if (!sourceSet.has(element.id)) {
          this.sources.push(element);
          sourceSet.add(element.id);
          this.categories.add(element.category);
        }
      });
    })
  }

}
