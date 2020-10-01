import React from 'react';


class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            formData : {},
            errorMessage : ''
        }
    }

    onSubmit = (event) => {

        event.preventDefault();
        
        if( !this.state.formData || ( !this.state.formData.mobile && !this.state.formData.landline ) ){

            this.setState({
                errorMessage : "Please fill one of the mobile field"
            });
            return;
        }

        const formData = this.state.formData;


        fetch('http://localhost:3006/create', {
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
                this.setState({
                    errorMessage : "Contact added successfully! Reloading for the changes"
                }); 

                setTimeout( () => {
                  window.location.reload(false);
                }, 1000);
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

    render() {
        
        return( <div> 
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>
            First Name
            <input type="text" name="firstName" className="form-control" placeholder="First Name" onChange={this.handleInputChange} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Last Name
            <input type="text" name="lastName" className="form-control" placeholder="Last Name" onChange={this.handleInputChange}/>
          </label>
        </div>
        <div className="form-group">
          <label>
            Mobile
            <input type="text" name="mobile" className="form-control" placeholder="Mobile" onChange={this.handleInputChange}/>
          </label>
        </div>
        <div className="form-group">
          <label>
            Landline
            <input type="text" name="landline" className="form-control" placeholder="Landline" onChange={this.handleInputChange}/>
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        {this.state.errorMessage && <div className="alert alert-danger">{this.state.errorMessage}</div>}
      </form>

        </div>
        );
    }
}

export default ContactForm;