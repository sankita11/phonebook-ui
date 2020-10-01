import React  from 'react'
import ListItem from './ListItem';
import ContactForm from './ContactForm';

class ContactComponent extends React.Component {

    constructor(props){
        super(props);
        this._isMounted = false ;
        
        this.state = {
            contacts : {},
            isAddContact: 0
        }
    }

    componentDidMount() {
        this._isMounted = true;
        fetch( 'http://localhost:3006/contacts/', {
            credentials: 'include',
        } ).then( (response) => response.json()).then((json) => {
            console.log(this._isMounted);
            if( this._isMounted){
                this.setState({
                    contacts : json
                }) 
            }
          });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    showAddForm = () => {
        this.setState({
            isAddContact : 1
        });
    }

    render() {
        console.log(this.state);
        const formattedData = Object.entries(this.state.contacts || {}).map((listItem) => {
            // listItem is an array with 2 values - the first being the firebase key
            // and the second being the data itself
            return {
              id: listItem[0],
              value: listItem[1]
            }
          })
          console.log(formattedData);
          

        return( 
            <div className="container"> 
                <h2 className="text-center">
                    PHONEBOOK LIST
                </h2>
                <hr/>
                <button className="btn btn-primary" onClick={this.showAddForm}>+ Add Contact</button>
                { this.state.isAddContact ? <ContactForm /> : ''}
                
                <hr/>
                <div className="list-group">
          
                    {formattedData.map((listItem) => {
                        return (
                            <ListItem
                                key={listItem.id}
                                id={listItem.id}
                                data={listItem.value}
                            />
                        )
                    })} 
          </div>
          </div>
        )
    }
     
}

export default ContactComponent;