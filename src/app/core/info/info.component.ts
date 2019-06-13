import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    /*
    window.location.hash = 'no-back-button';
    window.location.hash = 'Again-No-back-button'; // chrome
    window.onhashchange = function() {
      window.location.hash = 'no-back-button';

    }
    */
  }
}
