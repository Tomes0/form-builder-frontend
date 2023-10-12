import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NodeService} from "../../../core/services/node.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {skipWhile, tap} from "rxjs";
import {NodeProperty} from "../../../../assets/models/interfaces/NodeProperty";

@Component({
  selector: 'app-property-view',
  templateUrl: './property-view.component.html',
  styleUrls: ['./property-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyViewComponent {

  formBuilder = new FormBuilder().nonNullable;
  propertyFormGroup: FormGroup = this.formBuilder.group({});
  controlsAndCodes: { [key: string]: FormControl<string> } = {};
  node$ = this.nodeService.getSelectedNode().pipe(
    skipWhile(v => v.propertyList === undefined),
    tap(node => {
      node.propertyList.forEach(property => {
        this.controlsAndCodes[property] = new FormControl('', {nonNullable: true});
        this.propertyFormGroup.registerControl(property, this.controlsAndCodes[property]);
      })
    })
  );

  constructor(
    private nodeService: NodeService
  ) {}

  saveModifications() {
    let properties: NodeProperty = this.propertyFormGroup.value;

  }
}
