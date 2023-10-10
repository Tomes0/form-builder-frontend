import { Injectable } from '@angular/core';
import {TreeNode} from "primeng/api";

@Injectable()
export class NodeService {

  constructor() { }

  getFiles() {
    return fetch('assets/testFiles/files.json').then(res => res.json()).then(res => <TreeNode[]>res.data);
  }
}
