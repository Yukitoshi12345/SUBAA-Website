import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  // Validating Email by sending user an email
  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }



  // Code for Captcha Validation
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
            body: JSON.stringify({response: token}),
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



  //Submitting Form after Email Validation and Captcha Validation 
  submitForm(): void {
    if (this.validateEmail(this.email) && this.captchaValid) {
      // Form submission logic here
      const formData = {
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        email: this.email,
        message: this.message
      };

      this.http.post('/submit-form', formData)
        .subscribe(
          (response: any) => {
            console.log('Form submitted successfully!');
            // Reset form fields
            this.resetForm();
          },
          (error: any) => {
            console.error('Error submitting form:', error);
          }
        );
    } else {
      console.log('Please enter a valid email and captcha response');
    }
  }

  resetForm(): void {
    this.firstName = '';
    this.lastName = '';
    this.phoneNumber = '';
    this.email = '';
    this.message = '';
    this.captcha = '';
    this.emailInvalid = false;
    this.captchaInvalid = false;
    this.emailValid = false;
    this.captchaValid = false;
  }
}