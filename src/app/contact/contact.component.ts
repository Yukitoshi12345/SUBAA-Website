import { Component, OnInit } from '@angular/core';
declare var grecaptcha: {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {
  firstName!: string;
  lastName!: string;
  phoneNumber!: string;
  email!: string;
  message!: string;
  captcha!: string;

  emailInvalid!: boolean;
  captchaInvalid!: boolean;

  emailValid!: boolean;
  captchaValid!: boolean;

  constructor() { }

  ngOnInit(): void { }

  submitForm(): void {
    if (this.validateEmail(this.email) && this.validateCaptcha()) {
      // Form submission logic here
      console.log('Form submitted successfully!');
      console.log(`First Name: ${this.firstName}`);
      console.log(`Last Name: ${this.lastName}`);
      console.log(`Phone Number: ${this.phoneNumber}`);
      console.log(`Email: ${this.email}`);
      console.log(`Message: ${this.message}`);
    } else {
      console.log('Please enter a valid email and captcha response');
    }
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  validateCaptcha() {
    const siteKey = 'YOUR_SITE_KEY';        //Use Site Key created using SUBAA Email ID
    const secretKey = 'YOUR_SECRET_KEY';    //Use Secret Key created using SUBAA Email ID
  
    grecaptcha.ready(() => {
      grecaptcha.execute(siteKey, { action: 'submit' })
        .then((token: string) => {
          // Verify the token with your server-side API
          fetch('/verify-captcha', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ response: token, secret: secretKey }),
          })
            .then((response) => response.json())
            .then((data: { success: boolean }) => {
              if (data.success) {
                this.captchaValid = true;
              } else {
                this.captchaValid = false;
              }
            })
            .catch((error: Error) => {
              console.error(error);
              this.captchaValid = false;
            });
        })
        .catch((error: Error) => {
          console.error(error);
          this.captchaValid = false;
        });
    });
  return this.captchaValid
  }
}