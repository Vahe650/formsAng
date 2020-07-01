import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // styles: [`
  //   input.ng-invalid.ng-touched {
  //     border: 1px solid red;
  //   }`]
})
export class AppComponent implements OnInit {

  // @ViewChild('formElement') formElement: NgForm;


  answers = [
    {
      type: 'YES',
      text: 'yes'
    },
    {
      type: 'NO',
      text: 'no'
    }
  ];
  form: FormGroup;


  defaultAnswer = 'no';
  defaultCountry = 'ru';

  ngOnInit(): void {
    this.form = new FormGroup({
      user: new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email], this.checkForEmail),
        pass: new FormControl('', Validators.required),
      }),
      country: new FormControl('RU'),
      answer: new FormControl('YES')
    });
  }

  checkForEmail(contorl: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (contorl.value === 'test@mail.ru') {
          resolve({
            emailIsUsed: true
          },);
        } else {
          resolve(null);
        }
      }, 3000);
    });
  }

  //
  // formData = {};
  // isSubmited = false;
  //
  // submitForm() {
  //   this.isSubmited = true;
  //   this.formData = this.formElement.value;
  //   this.formElement.reset();
  // }
  //
  // addRandomEmial() {
  //   const randomEmail = 'wasd@gmail.com';
  //
  // this.formElement.setValue({
  //   user: {
  //     pass: '',
  //     email: randomEmail
  //   },
  //   country: '',
  //   answer: 'YES '
  // });
  //   this.formElement.form.patchValue({
  //     user: {email: randomEmail}
  //   });
  // }
  onSubmit() {
    console.log('submited!', this.form);
  }
}
