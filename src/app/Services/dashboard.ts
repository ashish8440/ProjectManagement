export interface IData {
  id: number;
  title: string;
  description: string;
  parentId: number | null;
  type: string;
  startDate: string;
  endDate: string;
  Status: string;
}


export interface IPRJName {
    name: string;
}

export interface ISubPRJName {
    name: string;
}