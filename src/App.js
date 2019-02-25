import React, { Component } from 'react'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import configureStore from './store'
import RouterView from './routes'
import './scss/styles.css'

// Let styled-components use sass variables by add theme
/* eslint import/no-webpack-loader-syntax: off */
import { ThemeProvider } from 'styled-components'
// const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!https://ivywang122.github.io/filter-tourism-app/scss/_base/_variables.scss')

const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!./scss/_base/_variables.scss')

// Create browser history to use in the Redux store
const history = createBrowserHistory()

const filterInitialState = {
  searchTags: [],
  zoneTags: [],
  cateTags: [],
  isFreeTag: false,
  isOpenTag: false,
  isTagsOn: false
}

const pageInitialState = {
  items: [],
  total: 0,
  pageCount: 1
}

const itemInfoInitialState = {
  id: '',
  name: '',
  imgUrl: '',
  location: '',
  cateNum: '',
  desc: '',
  opentime: '',
  ticket: ''
}

// Set InitialState
const initialState = { 
  filter: filterInitialState,
  page: pageInitialState,
  info: itemInfoInitialState
}

const store = configureStore(history, initialState)

export default class App extends Component {
  render() {

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ThemeProvider theme={theme}>
            <RouterView />
          </ThemeProvider>
        </ConnectedRouter> 
      </Provider>

    );
  }
}
