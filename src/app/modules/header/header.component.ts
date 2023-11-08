import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HeaderService} from "../../core/services/header.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  constructor(
    public headerService: HeaderService,
  ) { }
}
