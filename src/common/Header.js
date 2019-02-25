import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../store/actions'
import { Link } from 'react-router-dom'
import { FaLeaf, FaSearch } from 'react-icons/fa'
import { HeaderColor, Logo, SearchbarContainer, SearchBar } from '../styled/common/HeaderStyled'

class Header extends Component {
  constructor(props) {
    super(props)
    this.updateDimensions = this._updateDimensions.bind(this)
    this.renderHeader = this._renderHeader.bind(this)
    this.handleChange = this._handleChange.bind(this)
    this.onFocus = this._onFocus.bind(this)
    this.onBlur = this._onBlur.bind(this)
    this.onHomeClick = this._onHomeClick.bind(this)

    this.state = {
      placeholder: 'Explore your own activities',
      value: '',
      windowWidth: window.innerWidth,
      mediaPad: 768,
      isFocus: false
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const { windowWidth, mediaPad } = this.state;
    return(
      <HeaderColor>
        { windowWidth < mediaPad?
          <div>{this.renderHeader()}</div>
          :
          <div className="container">{this.renderHeader()}</div>
        }
      </HeaderColor>
    );
  }

  _renderHeader() {
    return (
      <div className="row no-gutters">
        <div className="col-12 col-md-4">
          <Logo>
            <Link to={`/`} onClick={this.onHomeClick}>
              <FaLeaf className="fa-icon" /><span>HaveFun</span>
            </Link>
          </Logo>
        </div>
        <div className="col-12 col-md-8">
          <SearchbarContainer>
            <SearchBar focus={this.state.isFocus} >
              <FaSearch className="fa-icon" />
              <input type="text"
                value={this.state.value}
                placeholder={this.state.placeholder}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onChange={this.handleChange} />
            </SearchBar>
          </SearchbarContainer>
        </div>
      </div>
    );
  }

  _updateDimensions() {
    this.setState({ windowWidth: window.innerWidth })
  }

  _handleChange(event) {
    this.setState({ value: event.target.value })
  }

  _onFocus() {
    this.setState({ placeholder: '', isFocus: true })
  }

  _onBlur() {
    this.setState({ placeholder: 'Explore your own activities', isFocus: false })
  }

  _onHomeClick() {
    // console.log(this.props.page)
    let pageCount = this.props.page.pageCount;
    if(pageCount !== 1) {
      this.props.getDataActions.getItemsList(1)
        .then(result => {
          if (result && result.error) {
            console.log(result.error)
          } else if (result) {
            let items = this.props.settingItems(result);
            this.props.pageActions.updateItemsList(items);
            this.goScrollTop();
          }
        })
        .catch(error => {
          console.log(error)

        });
      
    } else this.goScrollTop();
    
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

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Header)