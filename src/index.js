import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './header/Header';


import './index.css';


injectTapEventPlugin();

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        true ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/sign',
                state: { from: props.location }
            }}/>
        )
    )}/>
);

const NotFound = () => (
    <div className="not-found"><del>你来到了没有乐透星的寂寞之地</del><br/>滚</div>
);

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            toLogin: true
        }
    }

    handleRefreshStatus = () => {

    };


    render() {
        return (
            <BrowserRouter>
                <MuiThemeProvider>
                    <div className="layout">
                        <Header info={{name: this.state.name, toLogin: this.state.toLogin}} success={this.handleRefreshStatus} />
                            <div className="edge content">
                                <Switch>
                                    {/*<Route path="/sign" render={props => (*/}
                                        {/*<Sign {...props} success={this.handleRefreshStatus} />*/}
                                    {/*)}/>*/}
                                    {/*<Route path="/billboard" component={Billboard}/>*/}
                                    <Route component={NotFound}/>
                                </Switch>
                            </div>
                        {/*<Footer/>*/}
                    </div>
                </MuiThemeProvider>
            </BrowserRouter>
        );
    }
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
);
