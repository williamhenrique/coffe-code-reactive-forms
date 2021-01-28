import { Component } from '@angular/core';
import { AppService } from './app.service';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';
import { AppValidators } from './app.validators';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-forms-sample';

  form: FormGroup = this.fb.group({
    ticket: this.fb.group({
      title: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
    }),
    assign: this.fb.group({
      assign_email: this.fb.control('', [Validators.email], [this.validateUserEmailExist.bind(this)]),
    }),
    issue: this.fb.group({
      issue_code: this.fb.control('', [AppValidators.checkIssueFormat]),
      issue_close: this.fb.control(false)
    }),
    comment: this.fb.group({
      text: this.fb.control(''),
      comments: this.fb.array([])
    })

  }, {validators: AppValidators.checkIssueCodeExist})

  constructor(private app: AppService, private fb: FormBuilder){

  }

  add(){

    console.log(this.form);
    const text = this.form.get('comment.text') as FormControl;
    const comments = this.form.get('comment.comments') as FormArray;

    comments.push(
      this.addComment(text.value)
    );

    text.reset();

  }


  addComment(text: string){
    return this.fb.group({
      comment_text: this.fb.control(text)
    })
  }

  remove(index){
    const comments = this.form.get('comment.comments') as FormArray;
    comments.removeAt(index)
  }

  clear(){
    this.form.reset();
  }

  required(field, FormGroup){
    return (this.form.get(`${FormGroup}.${field}`).hasError('required') && this.form.get(`${FormGroup}.${field}`).dirty )
  }

  get invalidIssueCode(){
    return this.form.get('issue.issue_code').hasError('invalidIssueFormat') && this.form.get('issue.issue_code').dirty;
  }

  get invalidEmailUser(){
    return this.form.get('assign.assign_email').hasError('invalidEmailExist') && this.form.get('assign.assign_email').dirty;
  }

  validateUserEmailExist(control: AbstractControl){
    return this.app.getUsersByEmail(control.value).pipe(
      map((response: []) => {
          return response.length > 0 ? null : {invalidEmailExist: true};
      })
    )
  }



}
