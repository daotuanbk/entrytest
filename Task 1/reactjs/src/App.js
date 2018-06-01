import React, { Component } from 'react';
import './App.css';
import $ from "jquery";
class App extends Component {

  state = {
    result: [],
    pascalTriangle: [],
    row: 0,
    box: ''
  }

 async componentDidMount () {
 this._makeTriangle()
 this._renderPascalTriangle()

 $('button').on('click',function(){
    $("#input").append(<br/>)
  
 } )
 }

_makeTriangle = async () => {
  let i,j,k,s,m1,m2;
  let row = this.state.row;
  let result = [[]];
  await result[0].push(1);
 for(i=1; i<=row; i++){
   await result.push([])
   for(j=0; j<=i; ++j){
       if ((j==0) && ((i-j)==0)){ 
           result = [1];
       } else{
           s=1;
           for(k=1; k<=i; k++){
               s*=k;
           }
           m1=1;
           for(k=1; k<=j; k++){
               m1*=k;
           }
           m2=1;
           for(k=1; k<=(i-j); k++){
               m2*=k;
           }
       }  
       await result[i].push(s/(m1*m2));
   }                
}
this.setState({row: row})
this.setState({pascalTriangle: result})
this._renderPascalTriangle()
console.log(this.state.pascalTriangle)
}

_handleClick = async () => {
  
  let row = this.state.row;
  await row++;
  this.setState({row: row})
  console.log(`state ${this.state.row}`)
  this._makeTriangle();
 
  
}
_renderPascalTriangle = () => {
  let box = ''
  for (let i = 0; i<this.state.pascalTriangle.length; i++) {
    for (let j = 0; j < this.state.pascalTriangle[i].length; j ++) {
      box+= `   ${this.state.pascalTriangle[i][j]}`
    }
    box += `<br/>`
  }
  this.setState({box: box})
}
  render() {


    return (
      <div>
        <button onClick={this._handleClick}>
        Generate
      </button>
      <div id='input'>
      <span dangerouslySetInnerHTML={{__html: this.state.box}} >
      </span>
      </div>

      </div>

    );
  }
}

export default App;
