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
import { Login } from "./app/components/auth/login";
import { Rules } from "./app/components/rules/rules";
import { Prizes } from "./app/components/prizes/prizes";

import { Container } from './app/components/grid/grid';

// actions
import { checkAuth } from './app/actions/actions';


class Main extends React.Component {
  render() {
    return <h1>hello</h1>;
  }
}

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(checkAuth());
  }
  render() {
    // clone state and dispatch to child component props
    let elements;
    if(this.props.children) {
      elements = React.cloneElement(this.props.children, { state: this.props.state, dispatch: this.props.dispatch })
    }
    console.log(this.props.state)
    return (
      <MuiThemeProvider>
        <span>
          <NavBar state={this.props.state} dispatch={this.props.dispatch} />
          <Container>
            {elements}
          </Container>
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
        <Route path="login" component={Login} />
        <Route path="rules" component={Rules} />
        <Route path="prizes" component={Prizes} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
