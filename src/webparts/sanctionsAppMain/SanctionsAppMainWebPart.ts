import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SanctionsAppMainWebPartStrings';
import SanctionsAppMain from './components/SanctionsAppMain';
import { ISanctionsAppMainProps } from './components/ISanctionsAppMainProps';
import { ISanctionItem } from './components/ISanctionItem';
import { IHttpClientOptions, HttpClient, HttpClientResponse } from '@microsoft/sp-http';
import { IListResponseSanctionItem } from './components/IListResponseSanctionItem';
import * as _ from 'lodash';
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";

export interface ISanctionsAppMainWebPartProps {
  description: string;
}

export default class SanctionsAppMainWebPart extends BaseClientSideWebPart<ISanctionsAppMainWebPartProps> {

  public _buildColumns(): IColumn[] {

    const columns = [
  
      {
  
        key: 'id',
  
        name: 'ID',
  
        fieldName: 'id',
  
        minWidth: 40,
  
        maxWidth: 40,
  
        isResizable: true
  
      },
  
      {
  
        key: 'name',
  
        name: 'Name',
  
        fieldName: 'name',
  
        minWidth: 100,
  
        maxWidth: 100,
  
        isResizable: true
  
      },
  
      {
  
        key: 'type',
  
        name: 'Type',
  
        fieldName: 'type',
  
        minWidth: 100,
  
        maxWidth: 100,
  
        isResizable: true
  
      },
  
      {
  
        key: 'from',
  
        name: 'From',
  
        fieldName: 'from',
  
        minWidth: 100,
  
        maxWidth: 100,
  
        isResizable: true
  
      },
  
      {
  
        key: 'to',
  
        name: 'To',
  
        fieldName: 'to',
  
        minWidth: 100,
  
        maxWidth: 100,
  
        isResizable: true
  
      },
  
      {
  
        key: 'nationality',
  
        name: 'Nationality',
  
        fieldName: 'nationality',
  
        minWidth: 100,
  
        maxWidth: 100,
  
        isResizable: true
  
      },
  
      {
  
        key: 'projCountry',
  
        name: 'Project Country',
  
        fieldName: 'projCountry',
  
        minWidth: 100,
  
        maxWidth: 100,
  
        isResizable: true
  
      },
  
      {
  
        key: 'source',
  
        name: 'Source',
  
        fieldName: 'source',
  
        minWidth: 100,
  
        maxWidth: 100,
  
        isResizable: true
  
      },
  
      {
  
        key: 'grounds',
  
        name: 'Grounds',
  
        fieldName: 'grounds',
  
        minWidth: 100,
  
        maxWidth: 100,
  
        isResizable: true
  
      },
  
      {
  
        key: 'status',
  
        name: 'Status',
  
        fieldName: 'status',
  
        minWidth: 100,
  
        maxWidth: 100,
  
        isResizable: true
  
      }
  
    ];
  
   
  
    return columns;
  
  }

  public items(): ISanctionItem[] {
    //debugger;
    var listado: ISanctionItem[] = [];
    const requestHeaders: Headers = new Headers();
    requestHeaders.append('Content-Type', 'application/json; charset=utf-8');
    const httpClientOptions: IHttpClientOptions = {
      headers: requestHeaders,
      method: "GET",
      mode: "cors"
};


   //var url = this.fnHost + "readSanctions?pPageNumber=1&pPageSize=10000";
   var url = 'https://fn-np-sanctions.azurewebsites.net/api/readSanctions?code=XCRB/3/A62ZF10CG6p3p1MHMsZE5HCaHRTx/VcwDWaJ3FOAWDk6Irw==&pPageNumber=1&pPageSize=10000'
   this.context.httpClient.get(url, HttpClient.configurations.v1, httpClientOptions)
    .then((response: HttpClientResponse): Promise<{ value: IListResponseSanctionItem[] }> => {
        console.log("Entra response.json");
        console.log(response);
      
      return response.json();
    })
    .then((response: { value: IListResponseSanctionItem[] }): ISanctionItem[] => {
      // tslint:disable-next-line: no-function-expression
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
      return listado;
    }, (error: any): void => {
      console.log("There was an error loading items");
    });

  return listado;

};

  public render(): void {
    const element: React.ReactElement<ISanctionsAppMainProps > = React.createElement(
      SanctionsAppMain,
      {
        description: this.properties.description,
        columns: this._buildColumns(),
        items: this.items()
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
