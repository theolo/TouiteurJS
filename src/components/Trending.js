import React from 'react'

import {GetTrending} from '../api/TouitAPI'

class Trending extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            trending: [],
            clicked: false,
            mot: '',
        }
    }
    componentDidMount() {
        this.interval = setInterval(() =>
            GetTrending((data) => 
                this.setState({isLoading: false, trending: Object.entries(data).sort((a, b) => {
                    if (a[1] === b[1]) {
                        return 0;
                    } else {
                        return (a[1] < b[1]) ? 1 : -1;
                    }
                })})
            )
        , 10000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleClick = (e) => {
        if (this.state.mot !== e.target.value)
            this.setState({mot: e.target.value})
        else
            this.setState({mot: ''})

    }

    render() {
        if (window.location.hash !== this.state.mot){
            window.location.hash = this.state.mot
        }
        if (this.state.isLoading) {
            return (
                <div className="trending">
                    <p>chargement...</p>
                </div>
            )
        } else {
            return (
                <div className="trending">
                    {this.state.trending.map((trend, index) =>{
                        return <button 
                                key={index} 
                                className={this.state.mot === trend[0] ? 'active trend' : 'trend'} 
                                value={trend[0]} 
                                onClick={this.handleClick}>#{trend[0]}</button>    
                    })}
                </div>
            )
        }
    }
}

export default Trending;