import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { ISanctionItem } from "./ISanctionItem";

export interface ISanctionsAppMainProps {
  description: string;
  columns: IColumn[];
  items : ISanctionItem[];
}
