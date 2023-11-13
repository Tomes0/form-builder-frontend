import {ChangeDetectionStrategy, Component} from '@angular/core';
import {StructureService} from "../../../core/services/structure.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {skipWhile, tap} from "rxjs";
import {NodeMinimal} from "../../../shared/interfaces/NodeMinimal";
import {FieldType} from "../../../shared/enums/FiledTypes";
import {isEmptyObject} from "../../../shared/functions/isEmptyObject";
import {PropertyService} from "../../../core/services/property.service";

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

  labelFormControl = new FormControl<string>('', {nonNullable: true});
  propertyFormGroup!: FormGroup;

  node$ = this.propertyService.getSelectedNode().pipe(
    skipWhile(node => isEmptyObject(node)),
    tap(node => {

      this.propertyFormGroup = this.formBuilder.group({});

      this.labelFormControl.setValue(node.label);

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
    private structureService: StructureService,
    private propertyService: PropertyService
  ) {}

  saveModifications() {
    const propertyUpdate: NodeMinimal = {
      ...this._node,
      label: this.labelFormControl.value,
      properties: this.propertyFormGroup.value,
      fieldType: this._node.fieldType? this.filedTypeControl.value : undefined
    };

    this.propertyService.commitPropertyChanges(propertyUpdate);
  }
}
