import React from 'react';
import { Component } from 'react';
import './SignInMenu.css'

export default class SignInMenu extends Component{
    constructor(){
        super();
        this.state={
            email:"",
            password:"",
            wrongDetails:""
        }
        this.onInput = this.onInput.bind(this);
    }
    onInput(event){
        this.setState({[event.target.name]:event.target.value});
        console.log(this.state)
    }
    onSignIn(){
        fetch("http://localhost:3000/home",
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                mode: 'cors',
                body: JSON.stringify(this.state)                
            })
            .then(response => response.json())
            .then(data => {
                if( typeof data === 'number') this.props.hE(data)
                else                           this.setState({wrongDetails:data})
            })
    }
    render(){
        return(
            <div className="flexColumnCenter SignInMenu">
                <input name="email" className="inputBox" type="text" placeholder="Username" onChange={this.onInput}/>
                <input name="password" className="inputBox" type="password" placeholder="Password" onChange={this.onInput}/>
                <p id="signInFormBtn" className="btn1 signInBtn" onClick={()=>this.onSignIn()}>Sign in</p>
                <p id="wrongDetails" style={{display: this.state.wrongDetails === "" ? 'none':null}}>{this.state.wrongDetails}</p>
                <div className="newAccountSection">
                    <label className="newAccountLabel">Don't have and account </label>
                    <p id="registerBtn" onClick={()=> this.props.handleComp("register")}className="registerLabel">Register</p>
                </div>        </div>
        );
    }
}