import React, { Component } from 'react'
import SideBar from '../common/SideBar'
import ItemsContainer from './ItemsContainer'
import styled from 'styled-components'

class HomeContainer extends Component {
  constructor(props) {
    super(props)
    this.updateDimensions = this._updateDimensions.bind(this)

    this.state = {
      windowWidth: window.innerWidth,
      mediaPad: 768
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    // console.log(this.props)
    return (
      <ContentContainer>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4">
              <SideBar />
            </div>
            <div className="col-12 col-md-8">
              <ItemsContainer {...this.props} />
            </div>
          </div>
        </div>
      </ContentContainer>
    );
  }

  _updateDimensions() {
    this.setState({ windowWidth: window.innerWidth })
  }
}

const ContentContainer = styled.div`
   background-color: ${props => props.theme.lily};
`;

export default HomeContainer
