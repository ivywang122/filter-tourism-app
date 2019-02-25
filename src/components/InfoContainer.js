import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../store/actions'
import { FaMapMarkerAlt, FaRegClock, FaTicketAlt } from 'react-icons/fa'
import defaultCateOptions from '../data/cateOptions'

import styled from 'styled-components'

class InfoContainer extends Component {
  constructor(props) {
    super(props)
    this.getItemInfo = this._getItemInfo.bind(this)
    this.goBack = this._goBack.bind(this)

    this.state = {
      item: {},
      isLoading: false,
      isError: false

    }
  }

  componentDidMount() {
    this.getItemInfo();
  }

  render() {
    let { item, isLoading, isError } = this.state;
    if(isLoading) {
      return (
        <ContentContainer>
          <div className="container">
            Loading...
          </div>
        </ContentContainer>
      );
    }else if(isError){
      return (
        <ContentContainer>
          <div className="container">
            Error!!!!
          </div>
        </ContentContainer>
      );
    }else{
      return (
        <ContentContainer>
          <div className="container">
            <BreadCrumbBlock>
              <BackBtn onClick={this.goBack}>Back</BackBtn>
              <span>{item.name}</span>
            </BreadCrumbBlock>
            <WhiteBlock>
              <ImageBlock imgUrl={item.imgUrl} />
              <InfoBlock>
                <Title>{item.name}</Title>
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
                    {item.ticket !== '' ? 
                      <div className="ticket-info">
                        <FaTicketAlt className="fa-icon" /><span>{item.ticket}</span>
                      </div>
                      :
                      null                  
                    }
                  </div>
  
                  <InfoText>{item.desc}</InfoText>
  
                </TagsBlock>
              </InfoBlock>
            </WhiteBlock>
          </div>
        </ContentContainer>
      );

    }
  }

  _getItemInfo() {
    // console.log(this.props)
    let itemid = this.props.match.params.itemid;

    this.setState({ isLoading: true, isError: false });
    this.props.getDataActions.getItemInfo(itemid)
      .then(result => {
        if(result && result.error){
          this.setState({ isLoading: false, isError: true });

        }else if(result){
          // console.log(result)
          let item = this.settingItem(result[0]);
          this.props.infoActions.setItemInfo(item);
          
          this.setState({ item: item, isLoading: false, isError: false });

        }else{
          this.setState({ isLoading: false, isError: true });

        }
      })
      .catch(error => {
        this.setState({ isLoading: false, isError: true });

      })
  }

  _goBack() {
    // console.log(this.props.match)
    this.props.pageActions.routeToBack()
  }

  settingItem(result) {
    let item = {};

    item = {
      id: result.Id,
      name: result.Name,
      imgUrl: result.Picture1,
      location: result.Zone,
      cateNum: result.Class1,
      desc: result.Description,
      opentime: result.Opentime,
      ticket: result.Ticketinfo
    }
    for (let j = 0; j < defaultCateOptions.length; j++) {
      if (result.Class1 === defaultCateOptions[j].value.toString()) {
        item = { ...item, cate: defaultCateOptions[j].label }
      }
    }
    
    return item
  }
}

const ContentContainer = styled.div`
  padding: 40px 0;
  box-sizing: border-box;
  min-height: 100vh;
  background-color: ${props => props.theme.lily};
`;

const BreadCrumbBlock = styled.div`
  background-color: ${props => props.theme.lightGray};
  font-size: 18px;
  span{
    font-weight: 700;
    color: ${props => props.theme.purple};
    margin-left: 15px;
  }
`

const BackBtn = styled.button`
  padding: 10px 15px;
  cursor: pointer;
  font-weight: 500;
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.purple};
`

const WhiteBlock = styled.div`
  margin: 20px 0;
  background-color: ${props => props.theme.white};
`;

const ImageBlock = styled.div`
  background: ${props => props.imgUrl ? 'url(' + props.imgUrl + ') no-repeat 50% 50% / cover' : 'lightGray'}; 
  width: 100%;
  padding-bottom: 56%;
`;

export const Title = styled.h2`
  font-size: 36px;
  font-weight: 700;
  margin: .5em 0 .8em;
  color: ${props => props.theme.purple};
`;

export const InfoBlock = styled.div`
  padding: 20px 40px;
`;

export const TagsBlock = styled.div`
  font-size: 16px;
  .block{
    margin-bottom: 15px;
  }
  .open-info, .ticket-info{
    color: ${props => props.theme.silver};
  }

  .location-info, .open-info, .ticket-info{
    margin-right: 20px;
    display: inline-block;
    .fa-icon{
      margin-right: 5px;
    }
    span{
      vertical-align: middle;
    }
  }
  .tags-info{
    display: inline-block;
    .tag-wrapper{
      font-size: 14px;
      display: inline-block;
      padding: 3px 12px;
      background-color: ${props => props.theme.purple};
      color: ${props => props.theme.white};
      border-radius: 100px;
    }
  }
`;

export const InfoText = styled.div`
  margin: 40px 0 30px;
  line-height: 1.7;
`;

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    getDataActions: bindActionCreators(actions.getDataActions, dispatch),
    pageActions: bindActionCreators(actions.pageActions, dispatch),
    infoActions: bindActionCreators(actions.infoActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(InfoContainer)