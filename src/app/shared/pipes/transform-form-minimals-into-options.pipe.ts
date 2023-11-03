import { Pipe, PipeTransform } from '@angular/core';
import {FormMinimal} from "../interfaces/FormMinimal";

@Pipe({name: 'transformFormMinimalsIntoOptions'})
export class TransformFormMinimalsIntoOptionsPipe implements PipeTransform {
  transform(formMinimals: FormMinimal[] | null, ): {name: string, value: string}[] {
    if(formMinimals === null){
      return [];
    }

    return formMinimals.map(formMinimal => {
      return {name: formMinimal.name, value: formMinimal.code}
    })
  }
}