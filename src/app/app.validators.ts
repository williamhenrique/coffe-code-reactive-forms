import { AbstractControl } from "@angular/forms";

export class AppValidators{
  static checkIssueFormat(control: AbstractControl){

    if(!control.value){
      return null;
    }

    const regexp = /^[a-z]\d{3}$/i;
    const valid = regexp.test(control.value);

    return valid ? null : { invalidIssueFormat: true }
  }


  static checkIssueCodeExist(control: AbstractControl){
    const issueField = control.get('issue.issue_code').value as string;
    const hasIssueClose = control.get('issue.issue_close').value;

    return hasIssueClose && !(issueField.length > 0) ?  {invalidIssueClose: true} : null
  }
}
