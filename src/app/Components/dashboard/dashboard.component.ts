import { Component, OnInit, ViewChild } from '@angular/core';
import { DataServiceService } from './../../Services/data-service.service';
// import { IData } from './../../Services/dashboard';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
;
import { MatTable, MatTableModule } from '@angular/material/table';
import { DataPipePipe } from './data-pipe.pipe';
import { IPRJName, ISubPRJName, IData } from './../../Services/dashboard';
// import { ISubPRJName } from './../../Services/dashboard';

import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, DataPipePipe, FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class DashboardComponent implements OnInit {
  data: any;
  // projectData: IData[] = [];
  projectName: IPRJName[] = []; 
  subProjectName: ISubPRJName[] = [];

  

  subPrjSelected: string = 'ASV-Q1';

  prjSelected: string = 'ASV';

  bgcolor:string = '#28242c';
  color: string = '#efefef';


  // @ViewChild(MatTable) table: MatTable<any>;
  dataSource: IData[] = [];

  columnsToDisplay = ['startDate', 'endDate', 'status'];
  columnsToDisplayWithExpand = ['expand', 'startDate', 'endDate', 'status'];
  expandedElement: IData[] | null;
  constructor(private _dataService: DataServiceService) {}

  getData() {
    this._dataService.getProjectData().subscribe((projectValue) => {
      this.dataSource = projectValue;
    });
  }


  getProjectName() {
    this._dataService.getProjectName().subscribe((v) => {
      // console.log(v);
      this.projectName = v;
    });
  }

  getSubProjectName() {
    this._dataService.getSubProjectName().subscribe((v) => {
      this.subProjectName = v;
    });
  }

  ngOnInit() {
    this.getData();
    this.getProjectName();
    this.getSubProjectName();

    this._dataService.exclusive.subscribe(res=>{
      this.dataSource = res;
    })


  }

  changeValue(e: any) {
    console.log(e, this.dataSource);

    let aa= e.status == 'Pending' ? 'Completed': 'Pending';
    const newState = this.dataSource.map(obj =>
      obj.id === e.id ? { ...obj, status: aa } : obj
  );


  console.log(newState);
    
    this._dataService.exclusive.next(newState);
    // this.table.renderRows();
  }
}
