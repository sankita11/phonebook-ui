import React from 'react';
import Config from '../config/config';


class ListItem extends React.Component {

  constructor(props){
    super(props);

    this.listItem = props.data;
    this.id = props.id;

    this.state = {
      isEditing : false,
      formData: this.listItem
    }
  }


  
  removeItem = (event) => {

      event.target.parentNode.remove();

      fetch(Config.apiUrl + 'contact/delete/' + this.id , {
        method: 'POST',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
      }).then( (response) => {
        console.log(response.json);
        if(response.status === 200){
        }
      });

  }

  updateContact = (event) => {
    event.preventDefault();
    const formData = this.state.formData ;

    fetch( Config.apiUrl + 'contact/update/' + this.id , {
      method: 'POST',
      credentials: 'include',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then( (response) => {
      console.log(response.json);
      if(response.status === 200){
        this.listItem = formData;
        this.toggleEdit();
      }
    });

}

handleInputChange = (event) => {
  const target = event.target;
  const value =  target.value;
  const name = target.name;

  let formData = this.state.formData;
  formData[name] = value

  this.setState({
      formData: formData
  });
}


toggleEdit = () => {
    let isEditing = this.state.isEditing;
    this.setState({
      isEditing : !isEditing
    });
  }


    render() {

      if( this.state.isEditing ){
          return(           
          <div className=' list-group-item list-group-item d-flex justify-content-between align-items-center'>
            <form onSubmit={this.updateContact}>
              <div className="form-group w-100">
                <label>
                  First Name
                  <input type="text" 
                  name="firstName" className="form-control" 
                  placeholder="First Name" 
                  value={this.listItem.firstName}
                  onChange={this.handleInputChange} />
                </label>
                <label className="ml-2">
                  Last Name
                  <input 
                  type="text" 
                  name="lastName" 
                  className="form-control" 
                  placeholder="Last Name" 
                  value={this.listItem.lastName}
                  onChange={this.handleInputChange}/>
                </label>
              </div>
              <div className="form-group">
                <label>
                  Mobile
                  <input 
                  type="text" 
                  name="mobile" 
                  className="form-control" 
                  placeholder="Mobile" 
                  value={this.listItem.mobile}
                  onChange={this.handleInputChange}/>
                </label>
                <label className="ml-2">
                  Landline
                  <input 
                  type="text" 
                  name="landline" 
                  className="form-control" 
                  placeholder="Landline"
                  value={this.listItem.landline} 
                  onChange={this.handleInputChange}/>
                </label>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
              <button type="button" onClick={this.toggleEdit} className="btn btn-primary ml-3">Cancel</button>
              {this.state.errorMessage && <div className="alert alert-danger">{this.state.errorMessage}</div>}
            </form>
      
              </div>
              );
      }else{
        return (
          <div className=' list-group-item list-group-item d-flex justify-content-between align-items-center'>
            <div className="w-100">
              {this.listItem.firstName} {this.listItem.lastName}
              <br />
              { this.listItem.mobile ? <small className="text-muted">Mobile: {this.listItem.mobile}</small> : ''} 
              { this.listItem.landline ? <small className="text-muted ml-2">Landline: {this.listItem.landline}</small> : ''} 
            </div>
            <span onClick={this.toggleEdit} data-toggle="tooltip" className="badge badge-danger badge-pill action-btn">EDIT</span>
            <span onClick={this.removeItem} data-toggle="tooltip" title="Delete Contact" className="badge badge-danger badge-pill ml-1 action-btn">x</span>
          </div>
        );
  
      }

    }

  
}

export default ListItem;
