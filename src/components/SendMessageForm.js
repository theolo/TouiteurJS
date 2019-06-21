import React from 'react';
import {Send} from '../api/TouitAPI'

class SendMessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                name: '',
                message: '',
            }
        };
    }

    // handleChangeMessage = (e) => {
    //     this.setState({values:{message: e.target.value}})
    // }
    // handleChangeName = (e) => {
    //     this.setState({values:{name: e.target.value}})
    // }
    
    handleChange = (target, value) => {
        const newState = { ...this.state };
        newState.values[target] = value;
        this.setState({newState})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        Send(this.state.values.name, this.state.values.message, (response) => {
            if(response.success === true){
                console.log("Message envoyé");
            } else {
                console.log(response.error);
            }
        });
        this.setState({values:{name:this.state.values.name, message: ''}});
    }

    render() {
        const { values } = this.state;
        return (
            <div className="postform-content">
                <form className="postform" onSubmit={this.handleSubmit}>
                    <input className="nameInput" type="text" name="name" placeholder="Nom" value={values.name} onChange={event => this.handleChange('name', event.target.value)}/>
                    <input className="messInput" type="text" name="message" placeholder="message" value={values.message} onChange={event => this.handleChange('message', event.target.value)}/>
                    <button>Touiter</button>
                </form>
            </div>
        )
    }
}

export default SendMessageForm;