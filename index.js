// react
import React from 'react';
import ReactDOM from 'react-dom';

// redux
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { reducer } from "./app/reducers/reducer.js";
import thunk from 'redux-thunk';

// react-router
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

// material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// css
import "./app/css/style.css";

// components
import { NavBar } from "./app/components/navbar/navbar";

// import { Container } from './app/components/grid/grid';

// actions
// import { load } from './app/actions/actions.js';


class Main extends React.Component {
  render() {
    return <h1>hello</h1>;
  }
}

class App extends React.Component {
  render() {
    // clone state and dispatch to child component props
    let elements;
    if(this.props.children) {
      elements = React.cloneElement(this.props.children, { state: this.props.state, dispatch: this.props.dispatch })
    }
    return (
      <MuiThemeProvider>
        <span>
          <NavBar/>
          {elements}
        </span>
      </MuiThemeProvider>
    )
  }
};

// create store
const store = createStore(reducer, applyMiddleware(thunk))

const mapStateToProps = (state) => {
  return {
    state: state
  }
};

// connect to store
const AppContainer = connect(
  mapStateToProps
)(App);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={Main} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
