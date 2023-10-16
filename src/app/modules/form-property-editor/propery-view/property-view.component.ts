import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NodeService} from "../../../core/services/node.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {skipWhile, tap} from "rxjs";
import {NodeMinimal} from "../../../shared/interfaces/NodeMinimal";
import {FieldType} from "../../../shared/enums/FiledTypes";

@Component({
  selector: 'app-property-view',
  templateUrl: './property-view.component.html',
  styleUrls: ['./property-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyViewComponent {

  private _node!: NodeMinimal;
  private formBuilder = new FormBuilder().nonNullable;
  private controlsAndCodes: { [key: string]: FormControl<string> } = {};

  propertyFormGroup!: FormGroup;

  node$ = this.nodeService.getSelectedNode().pipe(
    skipWhile(v => v.propertyList === undefined),
    tap(node => {
      this.propertyFormGroup = this.formBuilder.group({});

      node.propertyList.forEach(propertyName => {
        const propertyValue = node.properties ? node.properties[propertyName] : '';
        this.controlsAndCodes[propertyName] = new FormControl(propertyValue, {nonNullable: true});
        this.propertyFormGroup.registerControl(propertyName, this.controlsAndCodes[propertyName]);
      });

      if(node.fieldType){
        this.filedTypeControl = new FormControl(node.fieldType, {nonNullable: true});
      }


      this._node = node;
    })
  );

  filedTypeControl!: FormControl<FieldType>;
  fieldTypeOptions = Object.entries(FieldType)
    .map(([key, value]) => {return {name: value, value: key}});

  constructor(
    private nodeService: NodeService
  ) {}

  saveModifications() {
    const propertyUpdate: NodeMinimal = {
      ...this._node,
      properties: this.propertyFormGroup.value,
      fieldType: this._node.fieldType? this.filedTypeControl.value : undefined
    };

    this.nodeService.updateNode(propertyUpdate);
  }
}
