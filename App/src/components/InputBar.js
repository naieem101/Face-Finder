import React from 'react';
import { Component } from "react";
import './InputBar.css';

class InputBar extends Component{
    render(){
        return(
            <div className="InputBar">
                <input className="inputBox" type="text" onChange={(e)=>this.props.hI(e)}/>
                <p className="btn1" onClick={(e)=> this.props.hE(e)}>Find Face</p>
            </div>
        );
    }
}
export default InputBar;