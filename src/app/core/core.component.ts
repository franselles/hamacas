import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Global } from '../shared/global.services';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private global: Global
  ) {}
  onMenuClick() {
    // this.el.nativeElement.querySelector('.collapse navbar-collapse'); //  get the DOM
    // this.renderer.setElementClass('DOM-Element', 'css-class-you-want-to-add', false) if 3rd value is true
    // it will add the css class. 'in' class is responsible for showing the menu.
    // this.el.nativeElement.querySelector('.collapse navbar-collapse'); //  get the DOM
// this.renderer.setElementClass('DOM-Element', 'css-class-you-want-to-add', false) if 3rd value is true
// it will add the css class. 'in' class is responsible for showing the menu.
this.renderer.removeClass(this.el.nativeElement.querySelector('navbarNavAltMarkup'), 'in');
  }

  ngOnInit() {}

  verOculto() {
    this.global.verOculto = true;
  }
}
