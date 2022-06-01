import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../_service/token.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {
  isLogged: boolean | undefined;



  constructor() { }

  ngOnInit(): void {
    this.isLogged = true
    // this.isLogged = TokenService.isLogged()
    console.log(this.isLogged)
  }

}

// (function () {
//   var app = angular.module("app", []).controller("ctrl", function ($scope) {
//     $scope.value = 10;
//     $scope.$watch(
//       function () { return TokenService.isLogged(); },
//       function () { console.log("value changed"); }
//     );
//   }
// })();