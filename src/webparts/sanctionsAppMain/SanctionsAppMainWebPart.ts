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

  public render(): void {
    const element: React.ReactElement<ISanctionsAppMainProps> = React.createElement(
      SanctionsAppMain,
      {
        description: this.properties.description,
        columns: this._buildColumns()
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
