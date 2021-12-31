import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailPipe'
})
export class EmailPipePipe implements PipeTransform {

  transform(value:any): any {
    let initialEmail=value
    let editedEmail=initialEmail.replace("reqres.in","solugenix.com")
    return editedEmail
    }
  }

