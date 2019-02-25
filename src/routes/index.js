import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from '../common/Header'
import HomeContainer from '../components/HomeContainer'
import InfoContainer from '../components/InfoContainer'


class RouterView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  componentDidMount() {
    console.log('public url: ', process.env.PUBLIC_URL)
    console.log(123)
  }

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div>
          <div style={{ paddingBottom: '86px' }}>
            <Header />
          </div>
          <Switch>
            <Route exact path={`/`} component={HomeContainer} />
            <Route path={`/page/:pagecount`} render={props => (
              <HomeContainer {...props} />
            )} />
            <Route path={`/info/:itemid`} component={InfoContainer} />
          </Switch>
        </div>
      </Router>
    );
  }
}


export default RouterView