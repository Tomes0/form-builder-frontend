import {Component} from '@angular/core';
import {getViewHeight} from "../shared/function/getViewHeight";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
  styleUrls: ['/main.component.scss']
})
export class MainComponent  {
  maxHeight = getViewHeight();

}
