import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpStatusCode} from "@angular/common/http";
import {FormMinimal} from "../../shared/interfaces/FormMinimal";
import {Form} from "../../shared/interfaces/Form";

@Injectable()
export class ApiService {


  private localhost = 'http://localhost:8080/rest/';

  constructor(
    private http: HttpClient
  ) { }

  getFormMinimals(){
    return this.http.get<FormMinimal[]>(this.localhost + 'form/getFormMinimals');
  }

  getFormByCode(code: string) {
    const params = new HttpParams().set("code", code);
    return this.http.get<Form>(this.localhost + 'form/getFormByCode', {params});
  }

  saveForm(form: Form) {
    return this.http.post(this.localhost + `form/saveForm`, form);
  }

  deleteForm(formCode: string){
    return this.http.delete<HttpStatusCode>(this.localhost + `form/deleteForm/${formCode}`);
  }

  createNewForm(formName: string) {
    return this.http.post<Form>(this.localhost + `form/createNewForm`, {formName});
  }
}
