import { Pipe, PipeTransform } from '@angular/core';
import {FormMinimal} from "../interfaces/FormMinimal";

@Pipe({name: 'transformFormMinimalsIntoOptions'})
export class TransformFormMinimalsIntoOptionsPipe implements PipeTransform {
  transform(formMinimals: FormMinimal[] | null, ): {name: string, code: string}[] {
    if(formMinimals === null){
      return [];
    }

    return formMinimals.map(formMinimal => {
      return {name: formMinimal.name, code: formMinimal.code}
    })
  }
}
