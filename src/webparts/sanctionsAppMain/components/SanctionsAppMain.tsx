import * as React from 'react';
import styles from './SanctionsAppMain.module.scss';
import { ISanctionsAppMainProps } from './ISanctionsAppMainProps';
import { DetailsListGrid } from './DetailsListGrid';
import { escape } from '@microsoft/sp-lodash-subset';
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { ISanctionItem } from './ISanctionItem';
import { IHttpClientOptions, HttpClient, HttpClientResponse } from '@microsoft/sp-http';
import * as _ from 'lodash';
import { IListResponseSanctionItem } from './IListResponseSanctionItem';

function _buildColumns(): IColumn[] {

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

      minWidth: 200,

      maxWidth: 200,

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

export default class SanctionsAppMain extends React.Component<ISanctionsAppMainProps, {}> {

  public render(): React.ReactElement<ISanctionsAppMainProps> {
    return (
      <DetailsListGrid columns={this.props.columns} items={this.props.items}></DetailsListGrid>
    );
  }
}
