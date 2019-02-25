import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../store/actions'
import { FaMapMarkerAlt, FaRegClock, FaTicketAlt } from 'react-icons/fa'
import { Block, Title, InfoText, ImageBlock, InfoBlock, TagsBlock 
} from '../styled/components/ResultItemsStyled'

class ItemsList extends Component{
  constructor(props) {
    super(props)
    this.renderItems = this._renderItems.bind(this)

    this.state = {
      pageCount: this.props.page.pageCount,
      items: []
    }
  }

  componentDidMount() {
    // this.props.getResultItems();
  }

  shouldComponentUpdate(newProps, newState) {
    if (this.props.page.pageCount !== newProps.page.pageCount) {
      this.setState({ pageCount: newProps.page.pageCount })
    }

    if (this.props.page.items !== newProps.page.items) {
      this.setState({ items: newProps.page.items });
    }

    if(this.props.isLoading !== newProps.isLoading || this.props.isError !== newProps.isError) {
      this.setState({ 
        isLoading: newProps.isLoading,
        isError: newProps.isError 
      });
    }
    
    return this.state !== newState
  }

  render() {
    // console.log(this.state.pageCount, this.props.pageCount)
    let { items, isLoading, isError } = this.state;
    console.log(items)
    if(isLoading) {
      return (
        <div>Loading Items....</div>
      );
    }else if(isError) {
      return (
        <div>Items Error!!!!</div>
      );
    }else {
      return (
        <div>
          {items.map((item, index) => this.renderItems(item, index))}
        </div>
      );

    }
  }

  _renderItems(item, index) {
    return (
      <Link to={`/info/${item.id}`} key={'key-' + index} onClick={this.goScrollTop}>
        <Block>
          <div className="row no-gutters">
            <div className="col-12 col-md-4">
              <ImageBlock imgUrl={item.imgUrl} />
            </div>
            <div className="col-12 col-md-8">
              <InfoBlock>
                <Title>{item.name}</Title>
                <InfoText>{item.desc}</InfoText>
                
                <TagsBlock>
                  <div className="block">
                    <div className="location-info">
                      <FaMapMarkerAlt className="fa-icon" />
                      <span>{item.location}</span>
                    </div>
                    <div className="tags-info">
                      <span className="tag-wrapper">{item.cate}</span>
                    </div>
                  </div>
                  <div className="block">
                    
                    <div className="open-info">
                      <FaRegClock className="fa-icon" /><span>{item.opentime}</span>
                    </div>

                    { item.ticket !== ''? 
                      <div className="ticket-info">
                        <FaTicketAlt className="fa-icon" /><span>{item.ticket}</span>
                      </div>
                      :
                      null
                    }

                  </div>
                </TagsBlock>

              </InfoBlock>
            </div>
          </div>
        </Block>
      </Link>
    );
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

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(ItemsList)