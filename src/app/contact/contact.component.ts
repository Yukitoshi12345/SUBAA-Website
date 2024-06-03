import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  name: string = '';
  email: string = '';
  message: string = '';

  constructor() {}

  ngOnInit() {}
  submitForm() {
    alert('Form Submitted');
  }
}
