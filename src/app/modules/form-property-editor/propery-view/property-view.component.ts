import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TreeViewService} from "../../../core/services/tree-view.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {skipWhile, tap} from "rxjs";

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
  node$ = this.treeViewService.getSelectedNode().pipe(
    skipWhile(v => v.propertyList === undefined),
    tap(node => {
      node.propertyList.forEach(property => {
        this.controlsAndCodes[property] = new FormControl('', {nonNullable: true});
        this.propertyFormGroup.registerControl(property, this.controlsAndCodes[property]);
      })
    })
  );

  constructor(
    private treeViewService: TreeViewService
  ) {}

  saveModifications() {
    console.log(this.propertyFormGroup.value);
  }
}
