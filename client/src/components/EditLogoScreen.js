import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { clamp } from "../utils/utlity";


//renderImage and renderText are initialised as null

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            multipletext{
                Xlocation
                Ylocation
                textName
                textSize
                textColor 
            }        
            backgroundColor
            borderColor
            borderWidth
            borderRadius
            padding
            margin
            logoWidth
            logoHeight 
            image {
                Xlocation
                Ylocation
                Url
                ImageHeight
                ImageWidth
            }      
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $multipletext:[textInput]!
        $backgroundColor: String!,
        $borderColor: String!,
        $borderWidth: Int!,
        $borderRadius: Int!,
        $padding: Int!,
        $margin: Int!,
        $logoWidth: Int!,
        $logoHeight: Int!,
       $image:[imageInput]!
       ) {
            updateLogo(
                id: $id,
                text: $text,
                multipletext: $multipletext
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                borderWidth: $borderWidth,
                borderRadius: $borderRadius,
                padding: $padding,
                margin: $margin
                logoWidth: $logoWidth
                logoHeight: $logoHeight
                image: $image) {
                    lastUpdate
                }
        }
`;
class EditLogoScreen extends Component {

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
            renderTextName:"",
            renderImageWidth:"",
            renderImageHeight:"",
            renderImage:[],
            renderMultipleText:[]
         }
        this.AddImage=this.AddImage.bind(this)
        this.AddText=this.AddText.bind(this)
    }
    AddImage(e){   
       this.setState({renderImage:[...this.state.renderImage,{Xlocation:5,Ylocation:5,Url:this.state.renderUrlText,ImageWidth:this.state.renderImageWidth,ImageHeight:this.state.renderImageHeight}]},()=>console.log(this.state.renderImage))    
    }
    AddText(){
        this.setState({renderMultipleText:[...this.state.renderMultipleText,{Xlocation:5,Ylocation:5,textName:this.state.renderTextName,textSize:this.state.renderFontSize,textColor:this.state.renderColor}]},()=>console.log(this.state.renderMultipleText))
     }
     
    render() {
        let text, color,fontSize,backgroundColor, borderColor, borderWidth, borderRadius, padding, margin, logoWidth, logoHeight,imageWidth,imageHeight;
        
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    console.log(data.logo.image[data.logo.image.length-1]);
                    
                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><Link to="/" className={"btn btn-secondary btn-block"}>Home</Link></h4>
                                            <h3 className="panel-title">
                                                Edit Logo
                                        </h3>
                                        </div>
                                        <div className="panel-body row">                                            
                                            <form className="col-6" onSubmit={e => {
                                                e.preventDefault();
                                                updateLogo({ variables: { id: data.logo._id, text: text.value, 
                                                                            backgroundColor: backgroundColor.value, borderColor: borderColor.value,
                                                                            borderWidth: parseInt(borderWidth.value), borderRadius: parseInt(borderRadius.value),
                                                                            padding: parseInt(padding.value), margin: parseInt(margin.value) ,logoWidth:parseInt(logoWidth.value) 
                                                                            ,logoHeight: parseInt(logoHeight.value),
                                                                            image: this.state.renderImage,
                                                                            multipletext: this.state.renderMultipleText,
                                                                        } });
                                                text.value = "";
                                                fontSize.value="";
                                                color.value="";
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
                                                    }} onChange={() => this.setState({renderText: text.value})} placeholder={data.logo.text} defaultValue={data.logo.text} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="Text">Text:</label>
                                                    <input type="text" className="form-control" name="textName" 
                                                    onChange={(e) => this.setState({renderTextName: e.target.value})} 
                                                    defaultValue={data.logo.multipletext.length!=0 ?data.logo.multipletext[data.logo.multipletext.length-1].textName:"Enter Text"} />

                                                    <label htmlFor="color">Color:</label>
                                                    <input type="color" className="form-control" name="color"  ref={node => {
                                                        color = node;
                                                    }} 
                                                    onChange={() => this.setState({renderColor: color.value})} 
                                                    defaultValue={data.logo.multipletext.length!=0 ?data.logo.multipletext[data.logo.multipletext.length-1].textColor:""} />

                                                    <label htmlFor="fontSize">Font Size:</label>
                                                    <input type="number" onInput={()=>{fontSize.value = clamp(fontSize.value, 0, 144);}} className="form-control" name="fontSize"  ref={node => {
                                                        fontSize = node;
                                                    }} 
                                                    onChange={() => this.setState({renderFontSize: parseInt(fontSize.value)})} 
                                                    defaultValue={data.logo.multipletext.length!=0 ?data.logo.multipletext[data.logo.multipletext.length-1].textSize:50} />
                                                   
                                                    <button type="button" className="btn btn-primary" onClick={(e)=>this.AddText(e)}>Add Text</button>
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="backgroundColor">Background Color:</label>
                                                    <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                        backgroundColor = node;
                                                    }} onChange={() => this.setState({renderBackgroundColor: backgroundColor.value})} placeholder={data.logo.backgroundColor} defaultValue={data.logo.backgroundColor} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="borderColor">Border Color:</label>
                                                    <input type="color" className="form-control" name="borderColor" ref={node => {
                                                        borderColor = node;
                                                    }} onChange={() => this.setState({renderBorderColor: borderColor.value})} placeholder={data.logo.color} defaultValue={data.logo.borderColor} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="borderWidth">Border Width:</label>
                                                    <input type="number" onInput={()=>{borderWidth.value = clamp(borderWidth.value, 0, 100);}} className="form-control" name="borderWidth" ref={node => {
                                                        borderWidth = node;
                                                    }} onChange={() => this.setState({renderBorderWidth: parseInt(borderWidth.value)})} placeholder={data.logo.borderWidth} defaultValue={data.logo.borderWidth} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="borderRadius">Border Radius:</label>
                                                    <input type="number" onInput={()=>{borderRadius.value = clamp(borderRadius.value, 0, 100);}} className="form-control" name="borderRadius" ref={node => {
                                                        borderRadius = node;
                                                    }} onChange={() => this.setState({renderBorderRadius: parseInt(borderRadius.value)})} placeholder={data.logo.borderRadius} defaultValue={data.logo.borderRadius} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="padding">Padding:</label>
                                                    <input type="number" onInput={()=>{padding.value = clamp(padding.value, 0, 100);}} className="form-control" name="padding" ref={node => {
                                                        padding = node;
                                                    }} onChange={() => this.setState({renderPadding: parseInt(padding.value)})} placeholder={data.logo.padding} defaultValue={data.logo.padding} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="margin">Margin:</label>
                                                    <input type="number" onInput={()=>{margin.value = clamp(margin.value, 0, 100);}} className="form-control" name="margin" ref={node => {
                                                        margin = node;
                                                    }} onChange={() => this.setState({renderMargin: parseInt(margin.value)})} placeholder={data.logo.margin} defaultValue={data.logo.margin} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="logoWidth">Logo Width:</label>
                                                    <input type="number" onInput={()=>{logoWidth.value = clamp(logoWidth.value, 0, 100);}} className="form-control" name="logoWidth" ref={node => {
                                                        logoWidth = node;
                                                    }} onChange={() => this.setState({renderLogoWidth: parseInt(logoWidth.value)})} placeholder={data.logo.logoWidth} defaultValue={data.logo.logoWidth} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="logoHeight">Logo Height:</label>
                                                    <input type="number" onInput={()=>{logoHeight.value = clamp(logoHeight.value, 0, 100);}} className="form-control" name="logoWidth" ref={node => {
                                                        logoHeight = node;
                                                    }} onChange={() => this.setState({renderLogoHeight: parseInt(logoHeight.value)})} placeholder={data.logo.logoHeight} defaultValue={data.logo.logoHeight} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="image">Image:</label>
                                                    <input type="text" className="form-control" name="Url" 
                                                    defaultValue={data.logo.image.length!=0?data.logo.image[data.logo.image.length-1].Url:"Enter URL"}
                                                    onChange={(e)=>this.setState({renderUrlText:e.target.value})} />

                                                    <label htmlFor="imageWidth">Image Width:</label>
                                                    <input type="number" onInput={()=>{imageWidth.value = clamp(imageWidth.value, 0, 100);}} className="form-control" name="imageWidth" ref={node => {
                                                        imageWidth = node;
                                                    }} onChange={() => this.setState({renderImageWidth: parseInt(imageWidth.value)})}
                                                     defaultValue={data.logo.image.length!=0?data.logo.image[data.logo.image.length-1].ImageWidth:50} />
                                                     
                                                    <label htmlFor="imageHeight">Image Height:</label>
                                                    <input type="number" onInput={()=>{imageHeight.value = clamp(imageHeight.value, 0, 100);}} className="form-control" name="imageHeight" ref={node => {
                                                        imageHeight = node;
                                                    }} onChange={() => this.setState({renderImageHeight: parseInt(imageHeight.value)})}
                                                     defaultValue={data.logo.image.length!=0?data.logo.image[data.logo.image.length-1].ImageHeight:50} />
                                                    <button type="button" className="btn btn-primary" onClick={(e)=>this.AddImage(e)}>Add Image</button>
                                                </div>
                                                <button type="submit" className="btn btn-success">Submit</button>
                                            </form>
                                            <div className="col-6">
                                                <span style={{
                                                    display: "inline-block",
                                                    
                                                    backgroundColor: this.state.renderBackgroundColor ? this.state.renderBackgroundColor : data.logo.backgroundColor,
                                                    borderColor: this.state.renderBorderColor ? this.state.renderBorderColor : data.logo.borderColor,
                                                    borderStyle: "solid",
                                                   
                                                    borderWidth: (this.state.renderBorderWidth ? this.state.renderBorderWidth : data.logo.borderWidth) + "px",
                                                    borderRadius: (this.state.renderBorderRadius ? this.state.renderBorderRadius : data.logo.borderRadius) + "px",
                                                    padding: (this.state.renderPadding ? this.state.renderPadding : data.logo.padding) + "px",
                                                    margin: (this.state.renderMargin ? this.state.renderMargin : data.logo.margin) + "px",
                                                    width: (this.state.renderLogoWidth ? this.state.renderLogoWidth: data.logo.logoWidth)*5 +"px",
                                                    height: (this.state.renderLogoHeight ? this.state.renderLogoHeight: data.logo.logoHeight)*4 + "px",
                                        
                                                }}>
                                                { 
                                                this.state.renderMultipleText!=0 ?this.state.renderMultipleText.map(function(Text) {
                                                return (
                                                <div style={{color:Text.textColor,fontSize:Text.textSize+"pt"}}>
                                                {Text.textName}
                                                </div>);})
                                                :data.logo.multipletext.map(function(Text) {
                                                    return (
                                                    <div style={{color:Text.textColor,fontSize:Text.textSize+"pt"}}>
                                                    {Text.textName}
                                                    </div>);})}
                                               
                                                {this.state.renderImage!=0? this.state.renderImage.map(function(image) {
                                                return (
                                                <div className="resizable" >
                                                <img src={image.Url} rounded="true" style={{width:image.ImageWidth*4,height:image.ImageHeight*4}}/>
                                                </div>);})
                                                :data.logo.image.map(function(image){
                                                return (
                                                <div className="resizable" >
                                                 <img src={image.Url} rounded="true" style={{width:image.ImageWidth*4,height:image.ImageHeight*4}}/>
                                                </div>);   
                                                })
                                                }
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
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;