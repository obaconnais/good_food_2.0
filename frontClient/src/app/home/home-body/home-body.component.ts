import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.css']
})
export class HomeBodyComponent implements OnInit {

  constructor(private ngbConfig: NgbCarouselConfig) {
    ngbConfig.showNavigationIndicators = false;
  }

  ngOnInit(): void {
  }

  images = ["../assets/images/poulpe.jpeg", "../assets/images/pickles.jpeg", "../assets/images/gateau.jpeg"]

}
