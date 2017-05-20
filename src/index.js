import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Auth from './Auth';
import Header from './header/Header';
import Footer from './footer/Footer';
import Main from './main/Main';
import Home from './home/Home';
import Ware from './ware/Ware';
import Pay from './pay/Pay';

import './index.css';


injectTapEventPlugin();

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        Auth.getLoginStatus() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/',
                state: { from: props.location }
            }}/>
        )
    )}/>
);

const NotFound = () => (
    <div className="not-found"><del>你来到了没有乐透星的寂寥之地</del><br/>滚</div>
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
                                    <Route exact path="/" component={Main}/>
                                    <Route exact path="/ware/:id" component={Ware}/>
                                    <PrivateRoute path="/home" component={Home} />
                                    <PrivateRoute path="/pay" component={Pay} />
                                    <Route component={NotFound}/>
                                </Switch>
                            </div>
                        <Footer/>
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
