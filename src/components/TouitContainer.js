import React from 'react';
import Touite from './Touit';
import {GetList} from '../api/TouitAPI'

class Touiteszone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            touits: [],
            ts: 0,
            mot : '',
            search: '',
            Sname: false
        }
    }

    handleChange = (e) => {
        this.setState({
            search: e.target.value,
            Sname: true
        })
    }

    componentDidMount() {
        let activeReq = false
        this.interval = setInterval(() => {
            if (this.state.mot !== window.location.hash){
                this.setState({mot: window.location.hash, Sname: false, search: ''})
            }
            if (activeReq === false) {
                activeReq = true
                GetList(this.state.ts, (data) => {
                    this.setState({touits: [...this.state.touits,...data.messages], isLoading: false, ts: data.ts})
                    activeReq = false
                })
            }
        }
        , 2000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        let wordToFind = null;
        const {touits, isLoading} = this.state;
        if (isLoading) {
            return (
                <div className="touiteszone">
                    <p>chargement...</p>
                </div>
            )
        } else {
            if (this.state.search !== ''){
                return (
                    <div className="touiteszone">
                        {touits.map((touit, index) => {
                            if(touit.message.toLowerCase().includes(this.state.search) || touit.name.toLowerCase().includes(this.state.search)) {
                                return <Touite 
                                        clas= {touit.message.toLowerCase().includes("vibr") ? 'vibre' : ''}
                                        key={index} {...touit} />
                            }
                            return null;
                        }
                        )}
                        <input className="w-100" type="text" placeholder="Search touit by name or content" value={this.state.search} onChange={this.handleChange} />
                    </div>
                )
            }else{
                wordToFind = new RegExp(`\\b${this.state.mot.substring(1)}\\b`, 'i')
                return (
                    <div className="touiteszone">
                        {touits.map((touit, index) => 
                            {if(wordToFind.test(touit.message)) {
                                return <Touite 
                                        addClas={touit.message.toLowerCase().includes("vibr") ? 'vibre' : ''}
                                        key={index} {...touit} />
                            }
                            return null;
                        })}
                        <input className="w-100" type="text" placeholder="Search touit by name or content" value={this.state.search} onChange={this.handleChange} />
                    </div>
                )
            }
        }
    }
}


export default Touiteszone;