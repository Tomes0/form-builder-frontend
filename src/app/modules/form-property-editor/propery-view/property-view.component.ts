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
  propertyFormGroup!: FormGroup;
  controlsAndCodes: { [key: string]: FormControl<string> } = {};
  node$ = this.nodeService.getSelectedNode().pipe(
    skipWhile(v => v.propertyList === undefined),
    tap(node => {
      this.propertyFormGroup = this.formBuilder.group({});

      node.propertyList.forEach(propertyName => {
        const propertyValue = node.properties ? node.properties[propertyName] : '';
        this.controlsAndCodes[propertyName] = new FormControl(propertyValue, {nonNullable: true});
        this.propertyFormGroup.registerControl(propertyName, this.controlsAndCodes[propertyName]);
      });
    })
  );

  constructor(
    private nodeService: NodeService
  ) {}

  saveModifications() {
    let properties: NodeProperty = this.propertyFormGroup.value;



  }
}
