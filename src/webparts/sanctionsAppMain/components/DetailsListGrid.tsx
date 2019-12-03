import * as React from 'react';
import { IDetailsListGridAppProps } from './IDetailsListAppProps';
import { DetailsList, DetailsRow, IDetailsRowProps, IDetailsRowStyles, IColumn, Selection, DetailsListLayoutMode } from 'office-ui-fabric-react/lib/DetailsList'; // Import to generate a simulated list
import { ISanctionItem } from './ISanctionItem';


export class DetailsListGrid extends React.Component<IDetailsListGridAppProps>
{
    arrs : ISanctionItem[] = [];
    constructor(props){
        super(props);
    }

    public render(): React.ReactElement<IDetailsListGridAppProps> {
        return (<DetailsList

            items={this.props.items}

            setKey="set"

            columns={this.props.columns}

            ariaLabelForSelectionColumn="Toggle selection"

            ariaLabelForSelectAllCheckbox="Toggle selection for all items"

            isHeaderVisible={true}            

            layoutMode={DetailsListLayoutMode.justified}

          />);
    }
}