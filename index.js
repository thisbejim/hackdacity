// fetch
import 'whatwg-fetch';

// react
import React from 'react';
import ReactDOM from 'react-dom';

// redux
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { reducer } from './app/reducers/reducer.js';
import thunk from 'redux-thunk';

// react-router
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// css
import './app/css/style.css';

// components
import { NavBar } from './app/components/navbar/navbar';
import { Rules } from './app/components/rules/rules';
import { Prizes } from './app/components/prizes/prizes';
import { Admin, Dashboard, Approve } from './app/components/admin/admin';
import { Home } from './app/components/home/home';
import { Submit } from './app/components/hackathon/submit';
// grid
import { Container } from './app/components/grid/grid';

// actions
import { startUp } from './app/actions/actions';

type Props = {
  state: any,
  dispatch: () => void,
  children?: any
}

class App extends React.Component {
  props: Props;
  componentDidMount() {
    this.props.dispatch(startUp());
  }
  render() {
    // clone state and dispatch to child component props
    let elements;
    if (this.props.children) {
      elements = React.cloneElement(this.props.children,
        {
          state: this.props.state,
          dispatch: this.props.dispatch,
        }
      );
    }
    return (
      <MuiThemeProvider>
        <span>
          <NavBar state={this.props.state} dispatch={this.props.dispatch} />
          <Container>
            {elements}
          </Container>
        </span>
      </MuiThemeProvider>
    );
  }
}

// create store
const store = createStore(reducer, applyMiddleware(thunk));

const mapStateToProps = (state) => ({
  state,
});

// connect to store
const AppContainer = connect(
  mapStateToProps
)(App);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={Home} />
        <Route path="rules" component={Rules} />
        <Route path="prizes" component={Prizes} />
        <Route path="submit" component={Submit} />
        <Route path="admin" component={Admin}>
          <Route path="dashboard" component={Dashboard} />
          <Route path="approve" component={Approve} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
