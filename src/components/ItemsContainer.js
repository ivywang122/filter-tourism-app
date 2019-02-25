import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../store/actions'
import { FaTimesCircle } from 'react-icons/fa'
import { ResultContainer, ResultText, TagsList, Tag } from '../styled/components/ResultItemsStyled'
import ItemsList from './ItemsList'
import Pagesnate from './Pagesnate'
import defaultCateOptions from '../data/cateOptions'


class ItemsContainer extends Component {
  _isMounted = false;
  constructor(props) {
    super(props)
    this.getPagesTotal = this._getPagesTotal.bind(this)
    this.getResultItems = this._getResultItems.bind(this)
    this.getFilterItems = this._getFilterItems.bind(this)
    this.getPageCountData = this._getPageCountData.bind(this)
    this.settingItems = this._settingItems.bind(this)
    this.renderTags = this._renderTags.bind(this)
    this.deleteTag = this._deleteTag.bind(this)


    this.state = {
      pageCount: 1,
      pagesTotal: 0,
      total: 0,
      filter: this.props.filter,
      zoneTags: [],
      cateTags: [],
      isFreeTag: false,
      isOpenTag: false,

      isLoading: false,
      isError: false,
      isPageUrl: false
    }
  }

  componentDidMount() {
    this._isMounted = true;

    if(this._isMounted) {
      this.getPagesTotal();
    }
    
    window.addEventListener('popstate', () => {
      this.getPagesTotal();
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('popstate', this.getPagesTotal() );
  }

  shouldComponentUpdate(newProps, newState) {
    if(this.props.page.pageCount !== newProps.page.pageCount) {
      this.setState({ pageCount: newProps.page.pageCount });
    }

    if(this.props.page.total !== newProps.page.total) {
      let pagesTotal = Math.ceil(newProps.page.total / 10);
      this.setState({ total: newProps.page.total, pagesTotal: pagesTotal });
    }

    if(this.props.filter !== newProps.filter) {
      this.setState({ 
        filter: newProps.filter,
        zoneTags: newProps.filter.zoneTags,
        cateTags: newProps.filter.cateTags,
        isFreeTag: newProps.filter.isFreeTag,
        isOpenTag: newProps.filter.isOpenTag
      }, () => {
        this.getFilterItems(1)
      } );
    }

    return this.state !== newState
  }

  render() {
    let { isPageUrl, isLoading, isError, total, zoneTags, cateTags, isFreeTag } = this.state;

    return (
      <ResultContainer>
        <ResultText>Showing <span>{total}</span> results by...</ResultText>

        <TagsList>
          { zoneTags.length > 0 ? 
            zoneTags.map((tag, index) => this.renderTags(tag, index, 'zone')) 
            : 
            null
          }

          { cateTags.length > 0 ?
            cateTags.map((tag, index) => this.renderTags(tag, index, 'cate'))
            :
            null
          }

          { isFreeTag ?
            <Tag>
              <span>免費參觀</span>
              <FaTimesCircle className="fa-icon" onClick={() => this.deleteTag('ticket')} />
            </Tag>
            :
            null
          }
        </TagsList>

        <ItemsList getResultItems={this.getResultItems} isLoading={isLoading} isError={isError} />
        <Pagesnate getPageCountData={this.getPageCountData} />

      </ResultContainer>
    );

  
  }

  _renderTags(tag, index, type) {
    if (type === 'zone') {
      return (
        <Tag key={'tag-' + index}>
          <span>{tag}</span>
          <FaTimesCircle className="fa-icon" onClick={() => this.deleteTag(type, index)} />
        </Tag>
      );
    }

    if(type === 'cate') {
     let label = '';
      for (let i = 0; i < defaultCateOptions.length; i++) {
        if (tag === defaultCateOptions[i].value) {
          label = defaultCateOptions[i].label;
          return (
            <Tag key={'tag-' + index}>
              <span>{label}</span>
              <FaTimesCircle className="fa-icon" onClick={() => this.deleteTag(type, index)} />
            </Tag>
          );
        }
      }
    }
    
  }

  _getPagesTotal() {

    let match = this.props.match,
      path = match.path,
      pageurl = match.params.pagecount,
      pageCount = 0,
      isPageurlNum = !!!isNaN(pageurl);
    // console.log(isPageurlNum)
    if (this._isMounted) {
      // if (path === '/') {
      if (path === process.env.PUBLIC_URL + '/') {
        this.setState({ isPageUrl: true });
        pageCount = 1;
  
      } else if (isPageurlNum) {
        this.setState({ isPageUrl: true });
        pageCount = parseInt(pageurl, 10);
        
      }else{
        this.setState({ isPageUrl: false });
        return
      }
        
      let filter = this.state.filter;
  
      filter.isTagsOn ? this.getFilterItems(1) : this.getResultItems(pageCount);

    }


  }

  _getResultItems(pageCount = this.state.pageCount) {
    this.setState({ isLoading: true, isError: false });
    console.log('pageCount:', pageCount)

    this.props.getDataActions.getItemsTotalNum()
      .then(result => {
        if (result) {
          let pagesTotal = Math.ceil(result / 10);

          if (pageCount && pageCount <= pagesTotal) {

            this.setState({
              total: result,
              pagesTotal: pagesTotal,
            }, () => {
             
              this.props.getDataActions.getItemsList(pageCount)
                .then(result => {
                  if (result && result.error) {
                    this.setState({ isLoading: false, isError: true });

                  } else if (result) {
                    let items = this.settingItems(result);
                    this.props.pageActions.updateItemsList(items);
                    this.setState({ isLoading: false, isError: false });

                  } else {
                    this.setState({ isLoading: false, isError: true });
                  }
                })
                .catch(error => {
                  this.setState({ isLoading: false, isError: true });
                });
            });

          }

        }
      })
      .catch(error => {
        this.setState({ isLoading: false, isError: true });
        console.log(error)
      });

    
  }

  _getFilterItems(pageCount = this.state.pageCount) {
    let filter = this.state.filter;
    this.setState({ isLoading: true, isError: false });
    
    if(filter.isTagsOn) {
      let path = process.env.PUBLIC_URL + '/page/' + pageCount;
      this.props.pageActions.routeToPath(path);
      console.log(path)
      this.props.getDataActions.getFilterItemsTotalNum(filter)
        .then(result => {
          if (result) {
            let pagesTotal = Math.ceil(result / 10);

            if (pageCount && pageCount <= pagesTotal) {

              this.setState({
                total: result,
                pagesTotal: pagesTotal,

              }, () => {
                this.props.getDataActions.getSqlItemsList(pageCount, filter)
                  .then(result => {
                    if (result && result.error) {

                      this.setState({ isLoading: false, isError: true });

                    } else if (result) {

                      let items = this.settingItems(result);
                      this.props.pageActions.updateItemsList(items);
                      this.setState({ isLoading: false, isError: false });

                    } else {
                      this.setState({ isLoading: false, isError: true });
                    }
                  })
                  .catch(error => {
                    this.setState({ isLoading: false, isError: true });
                  });
              });

            }

          }
        })
        .catch(error => {
          this.setState({ isLoading: false, isError: true });
          console.log(error);
        });

      
    }else {
      let path = process.env.PUBLIC_URL + '/';
      this.props.pageActions.routeToPath(path);
      this.getResultItems(1)
    }

  }

  _getPageCountData(pageCount) {
    let filter = this.state.filter;
    this.setState({ isLoading: true, isError: false });

    if (filter.isTagsOn) {
    
      this.props.getDataActions.getSqlItemsList(pageCount, filter)
        .then(result => {
          if (result && result.error) {
            this.setState({ isLoading: false, isError: true });

          } else if (result) {
            let items = this.settingItems(result);
            this.props.pageActions.updateItemsList(items);     
            this.setState({ isLoading: false, isError: false });

          } else {
            this.setState({ isLoading: false, isError: true });
          }
        })
        .catch(error => {
          console.log(error)
          this.setState({ isLoading: false, isError: true });
        });

    } else {
      this.getResultItems(pageCount)
    }

  }

  _settingItems(result) {
    let items = [];
    for (let i = 0; i < result.length; i++) {
      items[i] = {
        id: result[i].Id,
        name: result[i].Name,
        imgUrl: result[i].Picture1,
        location: result[i].Zone,
        cateNum: result[i].Class1,
        desc: result[i].Description,
        opentime: result[i].Opentime,
        ticket: result[i].Ticketinfo
      }
      for (let j = 0; j < defaultCateOptions.length; j++) {
        if (result[i].Class1 === defaultCateOptions[j].value.toString()) {
          items[i] = { ...items[i], cate: defaultCateOptions[j].label }
        }
      }
    }
    return items
  }

  _deleteTag(type, index) {
    // console.log(type, index)
    let { zoneTags, cateTags, isFreeTag } = this.state,
      isTagsOn = zoneTags.length > 0 || cateTags.length > 0 || isFreeTag ? true : false;
    
    if(type === 'zone') {
      zoneTags = zoneTags.filter((tag, tagindex) => tagindex !== index);
      this.props.filterActions.updateZoneTag(zoneTags, isTagsOn)
    }else if (type === 'cate') {
      cateTags = cateTags.filter((tag, tagindex) => tagindex !== index);
      // console.log(cateTags)
      this.props.filterActions.updateCateTag(cateTags, isTagsOn)
    }else if(type === 'ticket') {
      isFreeTag = false;
      this.setState({ isFreeTag }, () => {
        this.props.filterActions.updateTicketfreeTag(isFreeTag, isTagsOn);

      })
    }
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
    pageActions: bindActionCreators(actions.pageActions, dispatch),
    filterActions: bindActionCreators(actions.filterActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(ItemsContainer)