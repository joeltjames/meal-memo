import { Component, OnInit } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faTools } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userCircle = faUserCircle;
  tools = faTools;

  constructor() { }

  ngOnInit(): void {
  }

}
