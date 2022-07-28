interface IDataRow {
  id: number;
  date: string;
  name: string;
  amount: number;
  distance: number;
}

interface IData {
  data: IDataRow[];
  pages: number;
}

interface IFilterCondition {
  field: string;
  condition: string;
  value: string;
}
