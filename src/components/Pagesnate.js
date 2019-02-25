import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../store/actions'
import { PagesnateWrapper, PagesBlock } from '../styled/components/PagesnateStyled'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

class Pagesnate extends Component {
  constructor(props) {
    super(props)

    this.onNextPage = this._onNextPage.bind(this)
    this.onPrevPage = this._onPrevPage.bind(this)
    this.onSpecifiedPage = this._onSpecifiedPage.bind(this)

    this.state = {
      filter: this.props.filter,
      pageCount: this.props.page.pageCount,
      pagesTotal: Math.ceil(this.props.page.total / 10)
    }
  }

  componentDidMount() {
    
  }

  shouldComponentUpdate(newProps, newState) {
    if (this.props.page.pageCount !== newProps.page.pageCount) {
      this.setState({ pageCount: newProps.page.pageCount })
    }

    if (this.props.page.total !== newProps.page.total) {
      let pagesTotal = Math.ceil(newProps.page.total / 10);
      this.setState({ total: newProps.page.total, pagesTotal: pagesTotal })
    }

    if (this.props.filter !== newProps.filter) {
      this.setState({ filter: newProps.filter })
    }

    return this.state !== newState
  }

  render() {

    let { pageCount, pagesTotal } = this.state;
    let x = Math.floor((pageCount - 1) / 4),
      y = Math.floor((pagesTotal - 1) / 4);

    let b1 = x*4 + 1,
      b2 = x*4 + 2,
      b3 = x*4 + 3,
      b4 = x*4 + 4,
      b5 = pagesTotal - 3,
      b6 = pagesTotal - 2,
      b7 = pagesTotal - 1,
      b8 = pagesTotal;

    if (pagesTotal === 0){
      return <PagesnateWrapper />

    }else if (pagesTotal < 7) {
      return (
        <PagesnateWrapper>
          <PagesBlock disabled={pageCount === 1} onClick={this.onPrevPage}><FaAngleLeft /></PagesBlock>

          <PagesBlock active={pageCount === b1} onClick={() => this.onSpecifiedPage(b1)}>{b1}</PagesBlock>
          { pagesTotal >= b2?
            <PagesBlock active={pageCount === b2} onClick={() => this.onSpecifiedPage(b2)}>{b2}</PagesBlock>
            :
            null
          }
          { pagesTotal >= b3 ? 
            <PagesBlock active={pageCount === b3} onClick={() => this.onSpecifiedPage(b3)}>{b3}</PagesBlock>
            :
            null
          }
          {pagesTotal >= b4 ? 
            <PagesBlock active={pageCount === b4} onClick={() => this.onSpecifiedPage(b4)}>{b4}</PagesBlock>
            :
            null
          }
          {pagesTotal >= b4+1 ? 
            <PagesBlock active={pageCount === b4 + 1} onClick={() => this.onSpecifiedPage(b4 + 1)}>{b4 + 1}</PagesBlock>
            :
            null
          }
          {pagesTotal >= b4+2 ? 
            <PagesBlock active={pageCount === b4 + 2} onClick={() => this.onSpecifiedPage(b4 + 2)}>{b4 + 2}</PagesBlock>
            :
            null
          }

          <PagesBlock disabled={pageCount === pagesTotal} onClick={this.onNextPage}><FaAngleRight /></PagesBlock>
        </PagesnateWrapper>
      );

    } else if (x === y){
      return (
        <PagesnateWrapper>
          <PagesBlock disabled={pageCount === 1} onClick={this.onPrevPage}><FaAngleLeft /></PagesBlock>

          <PagesBlock active={pageCount === b5 - 2} onClick={() => this.onSpecifiedPage(b5 - 2)}>{b5 - 2}</PagesBlock>
          <PagesBlock active={pageCount === b5 - 1} onClick={() => this.onSpecifiedPage(b5 - 1)}>{b5 - 1}</PagesBlock>
          <PagesBlock className="dots">...</PagesBlock>
          <PagesBlock active={pageCount === b5} onClick={() => this.onSpecifiedPage(b5)}>{b5}</PagesBlock>
          <PagesBlock active={pageCount === b6} onClick={() => this.onSpecifiedPage(b6)}>{b6}</PagesBlock>
          <PagesBlock active={pageCount === b7} onClick={() => this.onSpecifiedPage(b7)}>{b7}</PagesBlock>
          <PagesBlock active={pageCount === b8} onClick={() => this.onSpecifiedPage(b8)}>{b8}</PagesBlock>

          <PagesBlock disabled={pageCount === pagesTotal} onClick={this.onNextPage}><FaAngleRight /></PagesBlock>
        </PagesnateWrapper>
      );
    }else {

      return (
        <PagesnateWrapper>
          <PagesBlock disabled={pageCount === 1} onClick={this.onPrevPage}><FaAngleLeft /></PagesBlock>
  
          <PagesBlock active={pageCount === b1} onClick={() => this.onSpecifiedPage(b1)}>{b1}</PagesBlock>
          <PagesBlock active={pageCount === b2} onClick={() => this.onSpecifiedPage(b2)}>{b2}</PagesBlock>
          <PagesBlock active={pageCount === b3} onClick={() => this.onSpecifiedPage(b3)}>{b3}</PagesBlock>
          <PagesBlock active={pageCount === b4} onClick={() => this.onSpecifiedPage(b4)}>{b4}</PagesBlock>
          <PagesBlock className="dots">...</PagesBlock>
          <PagesBlock active={pageCount === b7} onClick={() => this.onSpecifiedPage(b7)}>{b7}</PagesBlock>
          <PagesBlock active={pageCount === b8} onClick={() => this.onSpecifiedPage(b8)}>{b8}</PagesBlock>
  
          <PagesBlock disabled={pageCount === pagesTotal} onClick={this.onNextPage}><FaAngleRight /></PagesBlock>
        </PagesnateWrapper>
      );
      
    }
    
  }



  _onNextPage() {
    let { pageCount, pagesTotal } = this.state;

    if (pageCount !== pagesTotal) {
      pageCount++
      // console.log(this.props)
      let path = '/page/' + pageCount;
      this.props.pageActions.routeToPath(path)
    }else return
    this.props.getPageCountData(pageCount)

    // this.getPageCountData(pageCount)
  }

  _onPrevPage() {
    let pageCount = this.state.pageCount;

    if (pageCount > 1) {
      pageCount--
      let path = '/page/' + pageCount;
      this.props.pageActions.routeToPath(path)
    }else return
    this.props.getPageCountData(pageCount)

    // this.getPageCountData(pageCount)
    
  }

  _onSpecifiedPage(pageCount) {
    let path = '/page/' + pageCount;
    this.props.pageActions.routeToPath(path)
    console.log('spec', pageCount)
    this.props.getPageCountData(pageCount)
    // this.setState({ pageCount }, () => this.getPageCountData(pageCount));
    
  }

  goScrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}


const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    getDataActions: bindActionCreators(actions.getDataActions, dispatch),
    pageActions: bindActionCreators(actions.pageActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Pagesnate)