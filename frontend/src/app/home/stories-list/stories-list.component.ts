import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-stories-list',
  templateUrl: './stories-list.component.html',
  styleUrls: ['./stories-list.component.css']
})
export class StoriesListComponent implements OnInit {

  articles:any;


  constructor( private data : DataService) { }

  ngOnInit(): void {
    this.data.getAll()
      .subscribe(
        res=>{
          this.articles = res;
        },
        err=>{
          console.log(err);
        }
      )
  }




}
