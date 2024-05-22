import { Component, OnInit, ViewChild } from '@angular/core';
import { DataServiceService } from './../../Services/data-service.service';
// import { IData } from './../../Services/dashboard';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';
import { DataPipePipe } from './data-pipe.pipe';
import { IPRJName, ISubPRJName, IData } from './../../Services/dashboard';
// import { ISubPRJName } from './../../Services/dashboard';

import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav'; 

import { FlexLayoutModule } from '@angular/flex-layout';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    DataPipePipe,
    FormsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSidenavModule,
    FlexLayoutModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  data: any;
  // projectData: IData[] = [];
  projectName: IPRJName[] = [];
  subProjectName: ISubPRJName[] = [];

  checked = false;
  // disabled = false;

  subPrjSelected: string = 'ASV-Q1';

  prjSelected: string = 'ASV';

  bgcolor: string = '#28242c';
  color: string = '#efefef';

  // @ViewChild(MatTable) table: MatTable<any>;
  dataSource: IData[] = [];

  dataSrc: IData[] = [];

  columnsToDisplay = ['Start Date', 'End Date', 'Status'];
  columnsToDisplayWithExpand = ['expand', 'Start Date', 'End Date', 'Status'];
  expandedElement: IData[] | null;
  constructor(private _dataService: DataServiceService) {}

  getData() {
    this._dataService.getProjectData().subscribe((projectValue) => {
      // this.dataSource = projectValue;

      this.dataSrc = projectValue;

      this.dataSource = projectValue.filter((e) => {
        return e.type == 'Milestone';
      });
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

    this._dataService.exclusive.subscribe((res) => {
      this.dataSource = res;
    });

    this._dataService.subExclusive.subscribe((res) => {
      this.dataSrc = res;
    });
  }

  // changeValue(e: any) {
  //   console.log(e, this.dataSource);

  //   let aa= e.status == 'Pending' ? 'Completed': 'Pending';
  //   const newState = this.dataSource.map(obj =>
  //     obj.id === e.id ? { ...obj, Status: aa } : obj
  // );

  // console.log(newState);

  //   this._dataService.exclusive.next(newState);
  //   // this.table.renderRows();
  // }

  setValue(e: any, f: any) {
    console.log(e.checked, f);

    let aa = e.checked == true ? 'Completed' : 'Pending';
    console.log(aa);
    const newState = this.dataSrc.map((obj) =>
      obj.id == f.id ? { ...obj, Status: aa } : obj
    );

    console.log(newState);

    this._dataService.subExclusive.next(newState);

    const nn = newState.map((o) => {
      return o.parentId == f.parentId && o.Status == 'Completed';
    });

    for (var i = 0; i < newState.length; i++) {
      if (
        f.parentId == newState[i].parentId &&
        newState[i].Status == 'Completed'
      ) {
        console.log(newState[i].Status, newState[i].id);
      }
    }

    var filtered = newState.filter(function (elem) {
      return f.parentId == elem.parentId && elem.Status == 'Pending';
    });

    if (filtered.length == 0) {
      let aa = f.Status == 'Pending' ? 'Completed' : 'Pending';
      const newStateV = this.dataSource.map((obj) =>
        obj.id === f.parentId ? { ...obj, Status: aa } : obj
      );

      this._dataService.exclusive.next(newStateV);
    } else {
      let aa1 = 'Pending';
      const newStateV1 = this.dataSource.map((obj) =>
        obj.id === f.parentId ? { ...obj, Status: aa1 } : obj
      );

      this._dataService.exclusive.next(newStateV1);
    }
  }
}
