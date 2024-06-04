import React from 'react'
import { Component } from 'react'
import './ImageResult.css'

export default class ImageResult extends Component{
    render(){
        const img=this.props.img;
        const {top_row, left_col, bottom_row, right_col} = this.props.output
        const bottomRow= img.height*bottom_row;
        const topRow= img.height* top_row;
        const leftCol= img.width*left_col;
        const rightCol= img.width*right_col;
        console.log(this.props.output)
        console.log("here",top_row,left_col,bottom_row,right_col)
        const topLine={top: topRow, left: leftCol, right:img.width - rightCol};
        const bottomLine={top:bottomRow,left: leftCol, right:img.width - rightCol};
        const leftLine={left:leftCol, top:topRow, bottom: img.height - bottomRow};
        const rightLine={left:rightCol, top:topRow,bottom: img.height - bottomRow -4}
        console.log(topLine);

        return(
            <div className="flexRowCenter">
                <div className="ImageResult">
                    <img id="resultImage" src={img.url} alt="result"/>
                    <div style={topLine} className="hrLine"></div>
                    <div style={bottomLine} className="hrLine"></div>
                    <div style={leftLine} className="verLine"></div>
                    <div style={rightLine} className="verLine"></div>

                </div>
            </div>
        );
    }
}