import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

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
            lastUpdate
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

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div className="container">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4><Link to="/" className={"btn btn-secondary btn-block"}>Home</Link></h4>
                                    <h3 className="panel-title">
                                        View Logo
                                    </h3>
                                </div>
                                <div className="panel-body row">
                                    <div className="col-6">
                                        <dl>
                                            <dt>Logo Name:</dt>
                                            <dd>{data.logo.text}</dd>
                                            <dt>Logo Text</dt>
                                            <dd>{data.logo.multipletext.map(function(Text){
                                                return(Text.textName+"\n")
                                            })}</dd>
                                            <dt>BackgroundColor:</dt>
                                            <dd>{data.logo.backgroundColor}</dd>
                                            <dt>BorderColor:</dt>
                                            <dd>{data.logo.borderColor}</dd>
                                            <dt>Border Width:</dt>
                                            <dd>{data.logo.borderWidth}</dd>
                                            <dt>Border Radius:</dt>
                                            <dd>{data.logo.borderRadius}</dd>
                                            <dt>Padding:</dt>
                                            <dd>{data.logo.padding}</dd>
                                            <dt>Margin:</dt>
                                            <dd>{data.logo.margin}</dd>
                                            <dt>Last Updated:</dt>
                                            <dd>{data.logo.lastUpdate}</dd>
                                            <dt>Logo Width:</dt>
                                            <dd>{data.logo.logoWidth}</dd>
                                            <dt>Logo Height:</dt>
                                            <dd>{data.logo.logoHeight}</dd> 
                                            <dt>Image</dt>
                                            <dd>{data.logo.image.map(function(Image){
                                                return(Image.Url+"\n")
                                            })}</dd>
                                        </dl>
                                        <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                        {(removeLogo, { loading, error }) => (
                                            <div>
                                                <form
                                                    onSubmit={e => {
                                                        e.preventDefault();
                                                        removeLogo({ variables: { id: data.logo._id } });
                                                    }}>
                                                    <Link to={`/edit/${data.logo._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger">Delete</button>
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                        )}
                                    </Mutation>
                                    </div>
                                    <div className="col-6">
                                        <span style={{
                                            display: "inline-block",                                           
                                            backgroundColor: data.logo.backgroundColor,
                                            borderColor: data.logo.borderColor,
                                            borderStyle: "solid", 
                                            borderWidth: data.logo.borderWidth + "px",
                                            borderRadius: data.logo.borderRadius + "px",
                                            padding: data.logo.padding + "px",
                                            margin: data.logo.margin + "px",
                                            logoWidth: data.logo.logoWidth*5 + "px",
                                            logoHeight: data.logo.logoHeight*4 +"px"
                                        }}>
                                           { data.logo.multipletext.map(function(Text) {
                                                return (
                                                <div>
                                                {Text.textName}
                                                </div>);})}
                                        { data.logo.image.map(function(image) {
                                                return (
                                                <div>
                                                <img src={image.Url} rounded="true" style={{width:image.ImageWidth,height:image.ImageHeight}} />
                                                </div>);})}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default ViewLogoScreen;