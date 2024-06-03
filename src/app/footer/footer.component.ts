import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear(); // Initialize currentYear

  constructor() {}

  ngOnInit() {}
}
