import React from 'react'
import { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation.js'
import InputBar from './components/InputBar.js'
import ImageResult from './components/ImageResult';
import SignInMenu from './components/SignInMenu';  
import RegisterForm from './components/RegisterForm';


class App extends Component  {
  constructor(){
    super();
    this.state={
      activeComponent:"signIn",
      input:"",
      userId:'',
      userEntries:0,
      img:{url:"", height:0, width:0},
      output:{},
      imgResAvl:false
    }
    this.handleSignInMenu=this.handleSignInMenu.bind(this);
    this.handleComp=this.handleComp.bind(this);
    this.handleInput=this.handleInput.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  componentDidMount(){
    fetch("http://localhost:3000/")
    .then(data=> data.json())
    .then(console.log)
  }

  handleComp(activeComp){
    if(activeComp === "signIn") this.setState({imgResAvl:false})
    this.setState({activeComponent:activeComp});
  }
  handleSignInMenu(_userId){
      this.setState({userId: _userId});
      this.setState({activeComponent:'home'});
  }

  calcFace=(response) =>{
    const faceRegion=response.outputs[0].data.regions[0].region_info.bounding_box;
    this.setState(
      {output:faceRegion}
    )
    const img = document.getElementById("resultImage");

    this.setState({img: {url:this.state.input, height:Number(img.height), width:Number(img.width)}});

  }

  handleSubmit=(e)=>{

    if(this.state.input === "") return;
    this.setState({imgResAvl:false})
    this.setState({img: {url:this.state.input, height:0, width:0}});
    fetch("http://localhost:3000/imageurl",{
      method: "put",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({url:this.state.input})
    })
    .then(res => res.json())
    .then( (response) => {this.calcFace(response) })
    .then(this.setState({imgResAvl:true}))

    fetch('http://localhost:3000/image',{
      method: "PUT",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({id:this.state.userId})
    })
    .then(response => response.json())
    .then(entries => {
      this.setState(S => {userEntries: S.userEntries+=1})
    })
  }

  handleInput=(e)=>{
    this.setState({input:e.target.value})
  }
  // Register User, set userId, redirect to home
  onRegister=(_userId)=>{
    this.setState({userId:_userId})
    this.handleComp('home');
  }

  render(){
    const ac = this.state.activeComponent;
    
    return(
      <div>
        <Navigation activeComponent={ac} handleComp={this.handleComp}/>
        {
          ac === 'signIn'?  <SignInMenu handleComp={this.handleComp} hE={this.handleSignInMenu}/>:
          ac === 'register'? <RegisterForm onRegister={this.onRegister}/>:
                            <InputBar hE={this.handleSubmit} hI={this.handleInput} />
        } 
        {ac === 'home' && this.state.imgResAvl?<ImageResult output={this.state.output} img={this.state.img}/>:<></>}
      </div>
    );
  }
}

export default App;


// bottom_row: 0.7041139
// left_col: 0.09023544
// right_col: 0.50926113
// top_row: 0.12109673
