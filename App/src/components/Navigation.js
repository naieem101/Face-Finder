import React from 'react';
import { Component } from 'react';
import "./Navigation.css"
import logo from "./logo1.jpg";

class Navigation extends Component{
    render(){
        const ac=this.props.activeComponent;
        return(
            <nav className="navBar">
                <img src={logo} alt="logo" width='50px' height='50'/>
                <p 
                id="signInBtn" 
                className="btn1"
                onClick={()=>this.props.handleComp("signIn")} 
                style={{display: ac==='register'? null:'none'}}
                >
                    Sign In
                </p>

                <p 
                id="signOutBtn"
                className="btn1"
                onClick={()=>this.props.handleComp("signIn")} 
                style={{display: ac==='signIn' || ac === 'register' ?'none':null}}
                >
                    Sign Out
                </p>
            </nav>
        );
    }
}
export default Navigation;