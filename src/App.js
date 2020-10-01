import React from 'react';
import './App.css';
import LoginForm from './component/LoginForm';
import ContactComponent from './component/Contacts';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = { isLoggedIn : false};
  }


  componentDidMount() {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    this.setState( {
      isLoggedIn : isLoggedIn
    })

    isLoggedIn = localStorage.getItem("isLoggedIn");
    if( isLoggedIn ){
      this.setState( {
        isLoggedIn : isLoggedIn,
        isReady: true 
      })
    }else{
      this.setState({isLoggedIn : false, isReady: true}) ;
    }     
  }

  render () {

    if( !this.state.isReady){
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )
    }

    if(this.state.isLoggedIn){
      return(<ContactComponent />);
    }else{
      return(<LoginForm />);
    }
  }
}

export default App;
