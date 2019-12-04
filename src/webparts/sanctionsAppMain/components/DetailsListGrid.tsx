import * as React from 'react';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import styles from './SanctionsAppMain.module.scss';
import { IDetailsListGridAppProps } from './IDetailsListAppProps';
import { DetailsList, DetailsRow, IDetailsRowProps, IDetailsRowStyles, IColumn, Selection, DetailsListLayoutMode } from 'office-ui-fabric-react/lib/DetailsList'; // Import to generate a simulated list
import { ISanctionItem } from './ISanctionItem';
import { IDetailsListGridAppStates } from './IDetailsListGridAppStates';
import { IListResponseSanctionItem } from './IListResponseSanctionItem';
import * as _ from 'lodash';


const Loader = () => <Spinner size={SpinnerSize.large} />;
export class DetailsListGrid extends React.Component<IDetailsListGridAppProps, IDetailsListGridAppStates>
{

    constructor(props){
        super(props);
        this.state = {
          items: [],
          loading: true
        };
    }

    hideLoader = () => {
      this.setState({ loading: false });
    }
  
    showLoader = () => {
      this.setState({ loading: true });
    }

    componentDidMount() { 

        var listado: ISanctionItem[] = [];

        const _this = this;
        this.showLoader();

        fetch('https://fn-np-sanctions.azurewebsites.net/api/readSanctions?code=XCRB/3/A62ZF10CG6p3p1MHMsZE5HCaHRTx/VcwDWaJ3FOAWDk6Irw==&pPageNumber=1&pPageSize=10000')
          .then(response => response.json())
          .then((response: { value: IListResponseSanctionItem[] }): void => {
            _.forEach(response, function (anitem) {
              var itemListado: ISanctionItem;
              itemListado = { from: '', grounds: '', id: 0, name: '', nationality: '', projCountry: '', source: '', status: '', to: '', type: '', rowcount: '' };
              itemListado.from = anitem["datefrom"];
              itemListado.grounds = anitem["grounds"];
              itemListado.id = anitem["id"];
              itemListado.name = anitem["firmName"];
              itemListado.nationality = anitem["nationality"];
              itemListado.projCountry = anitem["country"];
              itemListado.source = anitem["source"];
              itemListado.status = anitem["statusName"];
              try {
                var dateFrom = new Date(anitem["datefrom"]);
                itemListado.from = Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'short', day: '2-digit' }).format(dateFrom);
                var dateTo = new Date(anitem["dateto"]);
                itemListado.to = Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'short', day: '2-digit' }).format(dateTo);
              } catch (Exception) {
                itemListado.from = anitem["datefrom"];
                itemListado.to = anitem["dateto"];
              }
              itemListado.type = anitem["entity"];
              itemListado.rowcount = anitem["rowCnt"];
              listado.push(itemListado);
            });
            this.setState({ items: listado })
            _this.hideLoader();

          }, (error: any): void => {
            console.log("There was an error loading items");
          })
      }

    public render(): React.ReactElement<IDetailsListGridAppProps> {
        return (
            <div>
            {(this.state.loading) ? <Loader /> : 
              <DetailsList 
                items={this.state.items}

                setKey="set"

                columns={this.props.columns}

                ariaLabelForSelectionColumn="Toggle selection"

                ariaLabelForSelectAllCheckbox="Toggle selection for all items"

                isHeaderVisible={true}            

                layoutMode={DetailsListLayoutMode.justified}/>
            }
        </div>);
    }
}