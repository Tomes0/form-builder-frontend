import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormMinimal} from "../../shared/interfaces/FormMinimal";

@Injectable()
export class ApiService {

  private localhost = 'http://localhost:8080/rest/';

  constructor(
    private http: HttpClient
  ) { }

  getFormMinimals(){
    return this.http.get<FormMinimal[]>(this.localhost + 'form/getFormMinimals');
  }

}
