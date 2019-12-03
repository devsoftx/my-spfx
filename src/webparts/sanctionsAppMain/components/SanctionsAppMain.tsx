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

export default class SanctionsAppMain extends React.Component<ISanctionsAppMainProps> {

  public render(): React.ReactElement<ISanctionsAppMainProps> {
    return (
      <DetailsListGrid columns={this.props.columns}></DetailsListGrid>
    );
  }
}
