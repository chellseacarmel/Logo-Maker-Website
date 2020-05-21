import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import { clamp } from '../utils/utlity';
import{Rnd} from 'react-rnd';

const ADD_LOGO = gql`
    mutation AddLogo(
        $text: String!,
        $multipletext:[textInput]!
        $backgroundColor: String!,
        $borderColor: String!,
        $borderWidth: Int!,
        $borderRadius: Int!,
        $padding: Int!,
        $margin: Int!
        $logoWidth:Int!
        $logoHeight:Int!
        $image:[imageInput]!) {
        addLogo(
            text: $text,    
            backgroundColor: $backgroundColor,
            borderColor: $borderColor,
            borderWidth: $borderWidth,
            borderRadius: $borderRadius,
            padding: $padding,
            margin: $margin
            logoWidth: $logoWidth
            logoHeight: $logoHeight
            image:$image
            multipletext:$multipletext) {
            _id
        }
    }
`;
const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#f0f0f0"
  };
  
class CreateLogoScreen extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            renderText: "",
            renderColor: "",
            renderBackgroundColor: "",
            renderBorderColor: "",
            renderBorderWidth: "",
            renderBorderRadius: "",
            renderFontSize: "",
            renderPadding: "",
            renderMargin: "",
            renderLogoWidth:"",
            renderLogoHeight:"",
            renderUrlText:"",
            renderImageWidth:"",
            renderImageHeight:"",
            renderTextName:"",
            renderImage:[],
            renderMultipleText:[]
        }
        this.AddImage=this.AddImage.bind(this);
        this.AddText=this.AddText.bind(this)
    }
    AddImage(){
        this.setState({renderImage:[...this.state.renderImage,{Xlocation:5,Ylocation:5,Url:this.state.renderUrlText,ImageWidth:this.state.renderImageWidth,ImageHeight:this.state.renderImageHeight}]},()=>console.log(this.state.renderImage))    
    }
    AddText(){
        this.setState({renderMultipleText:[...this.state.renderMultipleText,{Xlocation:5,Ylocation:5,textName:this.state.renderTextName,textSize:this.state.renderFontSize,textColor:this.state.renderColor}]},()=>console.log(this.state.renderMultipleText))
    }  
     
     
    
    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderWidth, borderRadius, padding, margin, logoWidth,logoHeight,imageWidth,imageHeight;
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4><Link to="/" className={"btn btn-secondary btn-block"}>Home</Link></h4>
                                <h3 className="panel-title">
                                    Create Logo
                            </h3>
                            </div>
                            <div className="panel-body row">
                                <form className="col-6" onSubmit={e => {
                                    e.preventDefault();
                                    addLogo({ variables: { text: text.value, 
                                                            backgroundColor: backgroundColor.value, borderColor: borderColor.value,
                                                            borderWidth: parseInt(borderWidth.value), borderRadius: parseInt(borderRadius.value),
                                                            padding: parseInt(padding.value), margin: parseInt(margin.value),
                                                            logoWidth: parseInt(logoWidth.value), logoHeight: parseInt(logoHeight.value),
                                                            image: this.state.renderImage,
                                                            multipletext: this.state.renderMultipleText
                                    }});
                                    text.value = "";
                                    color.value = "";
                                    fontSize.value = "";
                                    backgroundColor.value = "";
                                    borderColor.value = "";
                                    borderWidth.value = "";
                                    borderRadius.value = "";
                                    padding.value = "";
                                    margin.value = "";
                                    logoWidth.value="";
                                    logoHeight.value="";
                                    imageWidth.value="";
                                    imageHeight.value="";
                                }}>
                                    <div className="form-group col-8">
                                        <label htmlFor="text">Logo Name:</label>
                                        <input type="text" className="form-control" name="text" ref={node => {
                                            text = node;
                                        }} onChange={() => this.setState({renderText: text.value})} placeholder="Text" />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="Text">Text:</label>
                                        <input type="text" className="form-control" name="textName" 
                                        onChange={(e) => this.setState({renderTextName: e.target.value})} 
                                        placeholder="Text"
                                        />

                                        <label htmlFor="color">Color:</label>
                                        <input type="color" className="form-control" name="color"  ref={node => {
                                        color = node;
                                        }} 
                                        onChange={() => this.setState({renderColor: color.value})} 
                                        placeholder="Color"
                                        />

                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input type="number" onInput={()=>{fontSize.value = clamp(fontSize.value, 0, 144);}} className="form-control" name="fontSize"  ref={node => {
                                        fontSize = node;
                                        }} 
                                        onChange={() => this.setState({renderFontSize: parseInt(fontSize.value)})} 
                                        placeholder="Font Size"
                                        />
                                        <button type="button" className="btn btn-primary" onClick={(e)=>this.AddText(e)}>Add Text</button>
                                        </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="backgroundColor">Background Color:</label>
                                        <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                            backgroundColor = node;
                                        }} onChange={() => this.setState({renderBackgroundColor: backgroundColor.value})} placeholder="Background Color" />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="borderColor">Border Color:</label>
                                        <input type="color" className="form-control" name="borderColor" ref={node => {
                                            borderColor = node;
                                        }} onChange={() => this.setState({renderBorderColor: borderColor.value})} placeholder="Border Color" />
                                    </div>
                                    
                                    <div className="form-group col-8">
                                        <label htmlFor="borderWidth">Border Width:</label>
                                        <input type="number" onInput={()=>{borderWidth.value = clamp(borderWidth.value, 0, 100);}} className="form-control" name="borderWidth" ref={node => {
                                            borderWidth = node;
                                        }} onChange={() => this.setState({renderBorderWidth: parseInt(borderWidth.value)})} placeholder="Border Width" />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="borderRadius">Border Radius:</label>
                                        <input type="number" onInput={()=>{borderRadius.value = clamp(borderRadius.value, 0, 100);}} className="form-control" name="borderRadius" ref={node => {
                                            borderRadius = node;
                                        }} onChange={() => this.setState({renderBorderRadius: parseInt(borderRadius.value)})} placeholder="Border Radius" />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="padding">Padding:</label>
                                        <input type="number" onInput={()=>{padding.value = clamp(padding.value, 0, 100);}} className="form-control" name="padding" ref={node => {
                                            padding = node;
                                        }} onChange={() => this.setState({renderPadding: parseInt(padding.value)})} placeholder="Padding" />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="margin">Margin:</label>
                                        <input type="number" onInput={()=>{margin.value = clamp(margin.value, 0, 100);}} className="form-control" name="margin" ref={node => {
                                            margin = node;
                                        }} onChange={() => this.setState({renderMargin: parseInt(margin.value)})} placeholder="Margin" />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="logoWidth">Logo Width:</label>
                                        <input type="logoWidth" onInput={()=>{logoWidth.value = clamp(logoWidth.value, 0, 100);}} className="form-control" name="logoWidth" ref={node => {
                                            logoWidth = node;
                                        }} onChange={() => this.setState({renderLogoWidth: parseInt(logoWidth.value)})} placeholder="Logo Width" />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="logoHeight">Logo Height:</label>
                                        <input type="logoHeight" onInput={()=>{logoHeight.value = clamp(logoHeight.value, 0, 100);}} className="form-control" name="logoHeight" ref={node => {
                                            logoHeight = node;
                                        }} onChange={() => this.setState({renderLogoHeight: parseInt(logoHeight.value)})} placeholder="Logo Height" />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="image">Image:</label>
                                        <input type="text" className="form-control" name="Url" 
                                        onChange={(e)=>this.setState({renderUrlText:e.target.value})} 
                                        placeholder="Image URL"/>

                                        <label htmlFor="imageWidth">Image Width:</label>
                                        <input type="number" onInput={()=>{imageWidth.value = clamp(imageWidth.value, 0, 100);}} className="form-control" name="imageWidth" ref={node => {
                                            imageWidth = node;
                                            }} 
                                        onChange={() => this.setState({renderImageWidth: parseInt(imageWidth.value)})}
                                        placeholder="Image Width"/>

                                        <label htmlFor="imageHeight">Image Height:</label>
                                        <input type="number" onInput={()=>{imageHeight.value = clamp(imageHeight.value, 0, 100);}} className="form-control" name="imageHeight" ref={node => {
                                            imageHeight = node;
                                             }} onChange={() => this.setState({renderImageHeight: parseInt(imageHeight.value)})}
                                        placeholder="Image Height"/>

                                        <button type="button" className="btn btn-primary" onClick={(e)=>this.AddImage(e)}>Add Image</button>
                                    
                                    </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                                <div className="col-6">
                                    <span style={{
                                        display: "inline-block",
                                        backgroundColor: this.state.renderBackgroundColor ? this.state.renderBackgroundColor : "#FFFFFF",
                                        borderColor: this.state.renderBorderColor ? this.state.renderBorderColor : "#000000",
                                        borderStyle: "solid",
                                        borderWidth: (this.state.renderBorderWidth ? this.state.renderBorderWidth : 5) + "px",
                                        borderRadius: (this.state.renderBorderRadius ? this.state.renderBorderRadius : 5) + "px",
                                        padding: (this.state.renderPadding ? this.state.renderPadding : 0) + "px",
                                        margin: (this.state.renderMargin ? this.state.renderMargin : 0) + "px",
                                        logoWidth: (this.state.renderLogoWidth ? this.state.renderLogoWidth:0)*5 + "px",
                                        logoHeight: (this.state.renderLogoHeight ? this.state.renderLogoWidth:0)*5 + "px",

                                    }}>
                                     {this.state.renderMultipleText.length!=0?this.state.renderMultipleText.map(function(Text) {
                                        return (
                                            <Rnd  
                                            bounds="parent"
                                            style={{style}}
                                            default={{
                                                x: 0,
                                                y: 0,
                                              }}
                                            >
                                        <div style={{color:(Text.textColor?Text.textColor:"#FFFFFF"),fontSize:(Text.textSize?Text.textSize:5)+"pt"}}>
                                        {Text.textName}
                                        </div>
                                        </Rnd>);})
                                        :""}
                                     { this.state.renderImage.length!=0?this.state.renderImage.map(function(image) {
                                                return (
                                                    <Rnd  
                                                    bounds="parent"
                                                    style={{style}}
                                                    default={{
                                                        x: 0,
                                                        y: 0,
                                                      }}
                                                    >
                                                <div className="resizable">
                                                <img src={image.Url} rounded="true" className="img"style={{width:image.ImageWidth*2,height:image.ImageHeight*2}} />
                                                </div>
                                                </Rnd>);}):""}
                                    </span>
                                </div>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;