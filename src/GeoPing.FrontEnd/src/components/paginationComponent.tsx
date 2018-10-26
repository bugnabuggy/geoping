import * as React from 'react';
import { v4 as uuidV4 } from 'uuid';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import IPaginationComponentProps from '../componentProps/paginationComponentProps';

export class PaginationComponent extends React.Component<IPaginationComponentProps, any> {
  handlePrev = () => {
    this.props.changePagination( '1' );
  };
  handleNext = () => {
    this.props.changePagination( this.props.countPage.toString() );
  };
  handleChange = ( e: any ) => {
    this.props.changePagination( e.target.id );
  };

  renderEllipsis = () => {
    return (
      <PaginationItem
        key={uuidV4()}
      >
        <PaginationLink>
          ...
        </PaginationLink>
      </PaginationItem>
    );
  };

  renderPaginationItem = ( index: number, countPage: number, disablePage: number ) => {
    let prevItem: number = 1;
    let nextItem: number = countPage;
    let item: Array<any> = [];

    if ( index - ( this.props.numberAdditionalPages + 1 ) > prevItem ) {
      item.push( this.renderEllipsis() );
    }

    for ( let id = this.props.numberAdditionalPages * -1; id < this.props.numberAdditionalPages + 1; id += 1 ) {
      if ( ( index + id > prevItem ) && ( index + id < nextItem ) ) {
        const key: string = `${id}_pagination`;
        item.push(
          <PaginationItem
            key={key}
            active={index + id === index}
            disabled={!!disablePage}
            onClick={this.handleChange}
          >
            <PaginationLink id={( index + id ).toString()}>
              {index + id}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    if ( index + ( this.props.numberAdditionalPages + 1 ) < nextItem ) {
      item.push( this.renderEllipsis() );
    }

    return item;
  };

  renderPagination = () => {
    let paginationItem: Array<any> = [];
    paginationItem.push(
      <PaginationItem
        key={`1_pagination`}
        active={1 === this.props.activePage}
        disabled={1 === this.props.disablePage}
        onClick={this.handleChange}
      >
        <PaginationLink id="1">
          1
        </PaginationLink>
      </PaginationItem>
    );

    paginationItem.push( this.renderPaginationItem(
      this.props.activePage,
      this.props.countPage,
      this.props.disablePage
    ) );
    if ( this.props.countPage > 1 ) {
      paginationItem.push(
        <PaginationItem
          key={`${this.props.countPage}_pagination`}
          active={this.props.countPage === this.props.activePage}
          disabled={this.props.countPage === this.props.disablePage}
          onClick={this.handleChange}
        >
          <PaginationLink id={this.props.countPage.toString()}>
            {this.props.countPage}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return paginationItem;
  };

  render() {
    return (
      <Pagination
        style={{ margin: 0 }}
      >
        <PaginationItem onClick={this.handlePrev}>
          <PaginationLink previous={true}/>
        </PaginationItem>
        {this.renderPagination()}
        <PaginationItem onClick={this.handleNext}>
          <PaginationLink next={true}/>
        </PaginationItem>
      </Pagination>
    );
  }
}
