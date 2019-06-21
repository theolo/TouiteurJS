import React from 'react';

class Touite extends React.Component {
    render() {
        const {name, message, addClass} = this.props;
        return (
            <div className={"touite " + addClass}>
                <p className="message">{message}</p>
                <p className="pseudo">{name}</p>
            </div>
        )
    }
}

export default Touite;