import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { ISanctionItem } from './ISanctionItem';

export interface IDetailsListGridAppProps{
    columns : IColumn[];
    items: ISanctionItem[];
}