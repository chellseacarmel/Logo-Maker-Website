import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import { clamp } from '../utils/utlity';

const ADD_LOGO = gql`
    mutation AddLogo(
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderWidth: Int!,
        $borderRadius: Int!,
        $padding: Int!,
        $margin: Int!
        $logoWidth:Int!
        $logoHeight:Int!) {
        addLogo(
            text: $text,
            color: $color,
            fontSize: $fontSize,
            backgroundColor: $backgroundColor,
            borderColor: $borderColor,
            borderWidth: $borderWidth,
            borderRadius: $borderRadius,
            padding: $padding,
            margin: $margin
            logoWidth: $logoWidth
            logoHeight: $logoHeight) {
            _id
        }
    }
`;

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
            renderLogoHeight:""
        }
    }

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderWidth, borderRadius, padding, margin, logoWidth,logoHeight;
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
                                    addLogo({ variables: { text: text.value, color: color.value, fontSize: parseInt(fontSize.value),
                                                            backgroundColor: backgroundColor.value, borderColor: borderColor.value,
                                                            borderWidth: parseInt(borderWidth.value), borderRadius: parseInt(borderRadius.value),
                                                            padding: parseInt(padding.value), margin: parseInt(margin.value),
                                                            logoWidth: parseInt(logoWidth.value), logoHeight: parseInt(logoHeight.value)} });
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
                                }}>
                                    <div className="form-group col-8">
                                        <label htmlFor="text">Text:</label>
                                        <input type="text" className="form-control" name="text" ref={node => {
                                            text = node;
                                        }} onChange={() => this.setState({renderText: text.value})} placeholder="Text" />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="color">Color:</label>
                                        <input type="color" className="form-control" name="color" ref={node => {
                                            color = node;
                                        }}onChange={() => this.setState({renderColor: color.value})} placeholder="Color" />
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
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input type="text" onInput={()=>{fontSize.value = clamp(fontSize.value, 0, 144);}} className="form-control" name="fontSize" ref={node => {
                                            fontSize = node;
                                        }} onChange={() => this.setState({renderFontSize: parseInt(fontSize.value)})} placeholder="Font Size" />
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
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                                <div className="col-6">
                                    <span style={{
                                        display: "inline-block",
                                        color: this.state.renderColor ? this.state.renderColor : "#000000",
                                        backgroundColor: this.state.renderBackgroundColor ? this.state.renderBackgroundColor : "#FFFFFF",
                                        borderColor: this.state.renderBorderColor ? this.state.renderBorderColor : "#000000",
                                        borderStyle: "solid",
                                        fontSize: (this.state.renderFontSize ? this.state.renderFontSize : 12) + "pt",
                                        borderWidth: (this.state.renderBorderWidth ? this.state.renderBorderWidth : 5) + "px",
                                        borderRadius: (this.state.renderBorderRadius ? this.state.renderBorderRadius : 5) + "px",
                                        padding: (this.state.renderPadding ? this.state.renderPadding : 0) + "px",
                                        margin: (this.state.renderMargin ? this.state.renderMargin : 0) + "px",
                                        logoWidth: (this.state.renderLogoWidth ? this.state.renderLogoWidth:0)*5 + "px",
                                        logoHeight: (this.state.renderLogoHeight ? this.state.renderLogoWidth:0)*4 + "px",

                                    }}>{this.state.renderText ? this.state.renderText : "New Logo"}</span>
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