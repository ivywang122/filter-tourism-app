import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../store/actions'
import Select from 'react-select'
import Checkbox from 'rc-checkbox'
import 'rc-checkbox/assets/index.css'
import defaultCateOptions from '../data/cateOptions'
import { SideContainer, SideBarWrapper, ContentBlock, Title, CheckboxWrapper } from '../styled/common/SideBarStyled'

class SideBar extends Component {
  constructor(props) {
    super(props)
    this.onZoneChange = this._onZoneChange.bind(this)
    this.onCateChange = this._onCateChange.bind(this)
    this.onTicketChange = this._onTicketChange.bind(this)
    this.onOpenTimeChange = this._onOpenTimeChange.bind(this)

    this.state = {
      zoneOptions: [],
      zoneValues: [],
      isZoneLoading: true,
      isZoneSearchable: false,
      cateOptions: [],
      cateValues: [],
      isCateLoading: true,
      isCateSearchable: false,
      isOpenTag: false,
      isFreeTag: false
    }
  }

  componentDidMount() {
    this.createZoneOptions();
    this.createCategories();
    
  }

  shouldComponentUpdate(newProps, newState) {
    if ( 
        this.props.filter.zoneTags !== newProps.filter.zoneTags 
        && newProps.filter.zoneTags.length !== this.state.zoneValues.length
      ) {
        let zoneValues = this.state.zoneValues,
          newZoneValues = [],
          zoneTags = newProps.filter.zoneTags;
        for(let i = 0; i < zoneValues.length; i++) {
          for(let j = 0; j < zoneTags.length; j++) {
            if(zoneValues[i].label === zoneTags[j]) {
              newZoneValues = [...newZoneValues, zoneValues[i]]
            }
          }
        }
      this.setState({ zoneValues: newZoneValues });
    }
    if (
      this.props.filter.cateTags !== newProps.filter.cateTags
      && newProps.filter.cateTags.length !== this.state.cateValues.length
    ) {
      let cateValues = this.state.cateValues,
        newCateValues = [],
        cateTags = newProps.filter.cateTags;

      for (let i = 0; i < cateValues.length; i++) {
        for (let j = 0; j < cateTags.length; j++) {
          if (cateValues[i].value === cateTags[j]) {
            newCateValues = [...newCateValues, cateValues[i]];
          }
        }  
      }
      // console.log(newCateValues)
      this.setState({ cateValues: newCateValues });
    }

    if (this.props.filter.isFreeTag !== newProps.filter.isFreeTag) {
      // console.log(newProps.filter.isFreeTag)
      this.setState({ isFreeTag: newProps.filter.isFreeTag })
    }

    return this.state !== newState
  }

  render() {
    const { zoneOptions, isZoneLoading, isZoneSearchable, zoneValues, cateOptions, cateValues, isOpenTag, isFreeTag, isCateLoading, isCateSearchable } = this.state;
    // console.log(zoneOptions, zoneValues)
    return (
      <SideContainer>
        <SideBarWrapper>
          <ContentBlock>
            <Title>Location</Title>
              <Select className="select-styled"
                placeholder="全部"
                isMulti
                value={zoneValues}
                options={ zoneValues.length > 2 ? zoneValues : zoneOptions }
                onChange={values =>  this.onZoneChange(values) }
                isClearable={true}
                isSearchable={isZoneSearchable}
                isLoading={isZoneLoading} />

          </ContentBlock>
          <ContentBlock>
            <Title>Categories</Title>
            <Select className="select-styled"
              placeholder="全部"
              isMulti
              value={cateValues}
              options={cateValues.length > 2 ? cateValues : cateOptions}
              onChange={values => this.onCateChange(values)}
              isClearable={true}
              isSearchable={isCateSearchable}
              isLoading={isCateLoading} />

          </ContentBlock>

          <ContentBlock>
            <Title>Opening</Title>
            <CheckboxWrapper>
              <label htmlFor="ticketFree">
                <Checkbox 
                  id="ticketFree"
                  className="checkbox-style"
                  checked={isFreeTag} 
                  onChange={event => this.onTicketChange(event)} />
                <span className="label-text">免費參觀</span>
              </label>
            </CheckboxWrapper>
            <CheckboxWrapper>
              <label htmlFor="openTime">
                <Checkbox 
                  id="openTime"
                  className="checkbox-style"
                  checked={isOpenTag}
                  onChange={event => this.onOpenTimeChange(event)} />
                <span className="label-text">全天開放</span>
              </label>
            </CheckboxWrapper>
          </ContentBlock>
        </SideBarWrapper>
      </SideContainer>
    );
  }

  createZoneOptions() {
    this.props.getDataActions.getZoneValues()
      .then(result => {

        if (result && result.error) {
          this.setState({
            isZoneLoading: true,
            isZoneSearchable: false
          });

        } else if (result) {
          let records = result.result.records,
            zonesArr = [],
            zoneOptions = [];

          for (let i = 0; i < records.length; i++) {
            zonesArr = [...zonesArr, records[i].Zone]
          }

          zonesArr = zonesArr.filter((zone, index, arr) => {
            return arr.indexOf(zone) === index
          });

          for (let i = 0; i < zonesArr.length; i++) {
            let option = { value: i, label: zonesArr[i] };
            zoneOptions = [...zoneOptions, option];
          }

          this.setState({
            isZoneLoading: false,
            isZoneSearchable: true,
            zoneOptions: zoneOptions
          });

        }
      })
      .catch(error => {
        // console.log(error)
        this.setState({
          isZoneLoading: true,
          isZoneSearchable: false
        });
      });
  }

  createCategories() {

    let cateOptions;
    
    this.setState({
      isCateLoading: true,
      isCateSearchable: false
    }, () => {
      cateOptions = defaultCateOptions;
      this.setState({
        isCateLoading: false,
        isCateSearchable: true,
        cateOptions: cateOptions
      })
    });

    // this.props.getDataActions.getCateValues()
    //   .then(result => {
    //     if(result && result.error) {
    //       this.setState({
    //         isCateLoading: true,
    //         isCateSearchable: false
    //       });

    //     }else if(result) {
    //       let records = result.result.records,
    //         classNumArr = [],
    //         cateOptions = [];
          // console.log(records)

          // for (let i = 0; i < records.length; i++) {
          //   if (records[i].Class1 !== null)
          //     classNumArr = [...classNumArr, records[i].Class1]
          //   if (records[i].Class2 !== null)
          //     classNumArr = [...classNumArr, records[i].Class2]            
          // }

          // classNumArr = classNumArr.filter((num, index, arr) => {
          //   return arr.indexOf(num) === index
          // });

          // classNumArr = classNumArr.sort((a, b) => { return a - b })
          // console.log(classNumArr)

    
  }

  _onZoneChange(values) {
    this.setState({ zoneValues: values }, () => {
     
      let { zoneValues, cateValues, isFreeTag } = this.state,
        isTagsOn = zoneValues.length > 0 || cateValues.length > 0 || isFreeTag ? true : false,
        tags = [];
      for (let i = 0; i < zoneValues.length; i++) {
        tags = [...tags, zoneValues[i].label]
      }

      this.props.filterActions.updateZoneTag(tags, isTagsOn)

    })
  }

  _onCateChange(values) {
    this.setState({ cateValues: values }, () => {
      let { zoneValues, cateValues, isFreeTag } = this.state,
        isTagsOn = zoneValues.length > 0 || cateValues.length > 0 || isFreeTag ? true : false,
        tags = [];
      for (let i = 0; i < cateValues.length; i++) {
        tags = [...tags, cateValues[i].value]
      }
      this.props.filterActions.updateCateTag(tags, isTagsOn)
    })
  }

  settingItems(result) {
    let items = [];
    for (let i = 0; i < result.length; i++) {
      items[i] = {
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

  _onTicketChange(event) {
    this.setState({ isFreeTag: event.target.checked }, () => {
      let { zoneValues, cateValues, isFreeTag } = this.state,
        isTagsOn = zoneValues.length > 0 || cateValues.length > 0 || isFreeTag ? true : false;

      this.props.filterActions.updateTicketfreeTag(isFreeTag, isTagsOn)
    })
  }

  _onOpenTimeChange(event) {
    this.setState({ isOpenTag: event.target.checked })
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

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(SideBar)