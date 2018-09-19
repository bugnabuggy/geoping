import * as React from 'react';
import { Pagination } from 'react-bootstrap';
import { v4 as uuidV4 } from 'uuid';
import IPaginationComponentProps from '../componentProps/paginationComponentProps';

export class PaginationComponent extends React.Component<IPaginationComponentProps, any> {

  handleChange = ( e: any ) => {
    let page: string = '0';
    if ( isNaN ( Number ( e.target.text ) ) ) {
      const element: any = {
        '«': 1,
        '‹': this.props.activePage > 1 ? this.props.activePage - 1 : this.props.activePage,
        '›': this.props.activePage < this.props.countPage ? this.props.activePage + 1 : this.props.activePage,
        '»': this.props.countPage,
      };
      page = element[e.target.text];
    } else {
      page = e.target.text;
    }

    this.props.changePagination ( page );
  };

  renderEllipsis = () => {
    return <Pagination.Ellipsis key={uuidV4 ()}/>;
  };

  renderPaginationItem = ( index: number, countPage: number, disablePage: number ) => {
    let prevItem: number = 1;
    let nextItem: number = countPage;
    let item: Array<any> = [];

    if ( index - ( this.props.numberAdditionalPages + 1 ) > prevItem ) {
      item.push ( this.renderEllipsis () );
    }

    for ( let id = this.props.numberAdditionalPages * -1; id < this.props.numberAdditionalPages + 1; id += 1 ) {
      if ( ( index + id > prevItem ) && ( index + id < nextItem ) ) {
        const key: string = `${id}_pagination`;
        item.push (
          <Pagination.Item
            key={key}
            active={index + id === index}
            disabled={!!disablePage}
          >
            {index + id}
          </Pagination.Item>
        );
      }
    }

    if ( index + ( this.props.numberAdditionalPages + 1 ) < nextItem ) {
      item.push ( this.renderEllipsis () );
    }

    return item;
  };

  renderPagination = () => {
    let paginationItem: Array<any> = [];
    paginationItem.push (
      <Pagination.Item
        key={`1_pagination`}
        active={1 === this.props.activePage}
        disabled={1 === this.props.disablePage}
      >
        {1}
      </Pagination.Item> );

    paginationItem.push ( this.renderPaginationItem (
      this.props.activePage,
      this.props.countPage,
      this.props.disablePage
    ) );
    paginationItem.push (
      <Pagination.Item
        key={`${this.props.countPage}_pagination`}
        active={this.props.countPage === this.props.activePage}
        disabled={this.props.countPage === this.props.disablePage}
      >
        {this.props.countPage}
      </Pagination.Item>
    );

    return paginationItem;
  };

  render() {
    return (
      <Pagination
        style={{ margin: 0 }}
        onClick={this.handleChange}
        bsSize="small"
      >
        <Pagination.First
          id={'1'}
          onClick={this.handleChange}
        />
        <Pagination.Prev/>
        {this.renderPagination ()}
        <Pagination.Next/>
        <Pagination.Last/>
      </Pagination>
    );
  }
}
