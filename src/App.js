import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import axios from 'axios';
import './App.scss';


const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});
// Pages
// const Login = Loadable({
//   loader: () => import('./views/Pages/Login'),
//   loading
// });
const Register = Loadable({
  loader: () => import('./views/Pages/Register'),
  loading
});

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500'),
  loading
})

const URL = window.location.origin;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = `${URL}/callback`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        token: '',
    };
  }
  componentDidMount(){
    axios.get('http://rsc9-api.koreasouth.cloudapp.azure.com/api/user', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(function (response) {
      console.log(response);
      if(response.status === 401){
        localStorage.clear();
      }
    })
    .catch(function (error) {
      localStorage.clear();
      console.log(error);
    });
  }
  componentWillMount() {
    const url = window.location.href;
    const hash = url.substr(url.indexOf('#') + 1);
    const result = hash.split('&').reduce(function (result, item) {
        const parts = item.split('=');
        result[parts[0]] = parts[1];
        return result;
    }, {});
    this.setState({
        token: result.access_token
    })
  }
  render() {
    let token = this.state.token;
    if (token !== undefined) {
        localStorage.setItem('token', token)
    }
    let login = localStorage.getItem('token');
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/register" name="Register Page" component={Register}/>
          <Route exact path="/404" name="Page 404" component={Page404}/>
          <Route exact path="/500" name="Page 500" component={Page500}/>
          {!login ?
              <Route exact path="/login" name="Login Page" component={() => { 
                window.location.href = `http://rsc9-auth.koreasouth.cloudapp.azure.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token`; 
                return null;
           }}/>
              :
              <Route path="/" name="Home" component={DefaultLayout}/>
          }
          {!login && <Redirect to="/login"/>}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
