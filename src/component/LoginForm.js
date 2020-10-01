import React from 'react';

import firebase from '../services/firebase';
import ContactComponent from './Contacts';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      isLoggedIn : 0
    }
  }

  onSubmit = (event) => {
    event.preventDefault();

    if (!this.state.email || !this.state.password) {
      return;
    }

    firebase.signIn(this.state.email, this.state.password)
    .then((data) => {
        console.log(data);

        fetch('http://localhost:3006/login/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken: data,
            })
        }).then( (response) => {
            console.log(response);

            if( response.status !== 200 ){
                this.setState({
                    errorMessage: "Error Logging in"
                  })
            
            }else{
                localStorage.setItem("isLoggedIn", 1 );
                this.setState({
                    isLoggedIn: 1
                })
            }
            

        });

        
    }).then(() => {
       firebase.signOut();
    })
    .catch((error) => {
      this.setState({
        errorMessage: error.message
      })
    });


    
  }

  handleEmailChange = (event) => {
    this.setState({email: event.target.value});
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
  }

  render() {

    if( this.state.isLoggedIn ){
        return <ContactComponent />
    }else{
        return (
            <div className="container"> 
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>
                Email address
                <input type="email" className="form-control" placeholder="Enter email" onChange={this.handleEmailChange} />
              </label>
            </div>
            <div className="form-group">
              <label>
                Password
                <input type="password" className="form-control" placeholder="Password" onChange={this.handlePasswordChange} />
              </label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            {this.state.errorMessage && <div className="alert alert-danger">{this.state.errorMessage}</div>}
          </form>
          </div>
        );
     
    }

  }
}

export default LoginForm;
