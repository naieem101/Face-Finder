import React from "react";
import { Component } from "react";
import './RegisterForm.css'

export default class RegisterForm extends Component{
    constructor(){
        super();
        this.userInfo = {}
        this.state={userExists:false}
        this.onInput = this.onInput.bind(this);
    }

    onInput(event){
        this.userInfo[event.target.name]= event.target.value;
        console.log(this.userInfo);

    }

    onRegister=()=>{
        console.log(JSON.stringify(this.userInfo))
        fetch("http://localhost:3000/Register",
        {
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(this.userInfo)
        })
        .then(response => response.json())
        .then(data =>{
          if(data !== 'user exists') this.props.onRegister(data);
          else                       this.setState({userExists: true})
        })
    }
    render(){
        return(
            <div className="flexColumnCenter RegisterForm">
                <span>Register</span>
                <input name="name" type="text" className="inputBox registerName" placeholder="Your name" onChange={this.onInput}/>
                <input name="userName" type="text" className="inputBox registerUsername" placeholder="Username" onChange={this.onInput}/>
                <input name="email" type="text" className="inputBox registerEmail" placeholder="Email" onChange={this.onInput}/>
                <input name="password" type="password" className="inputBox registerPassword" placeholder="Passowrd" onChange={this.onInput}/>
                <p style={{display: this.state.userExists ? null:'none'}}> Email already in use </p>
                <p className="btn1 registerBtn" onClick={this.onRegister}>Register</p>
            </div>
        );
    }
}