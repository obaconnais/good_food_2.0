import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-zone',
  templateUrl: './landing-zone.component.html',
  styleUrls: ['./landing-zone.component.css']
})
export class LandingZoneComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  image: String = "../assets/image/landing_zone/salade.jpg"
}
