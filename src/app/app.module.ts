import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from "./store/reducers";
import {environment} from "../environments/environment";
import {EffectsModule} from "@ngrx/effects";
import {AppEffects} from "./store/app.effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {RouterState, StoreRouterConnectingModule} from "@ngrx/router-store";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MainModule} from "./modules/main.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictStateImmutability: true,
        strictStateSerializability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AppEffects]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal
    }),
    BrowserAnimationsModule,
    MainModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
