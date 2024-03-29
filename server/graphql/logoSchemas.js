var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var LogoModel = require('../models/Logo');

var TextInputType=new GraphQLInputObjectType({
    name:'textInput',
    fields: function (){
        return {
            Xlocation:{
                type: GraphQLInt
            },
            Ylocation:{
                type: GraphQLInt
            },
            textName: {
                type: GraphQLString
            },
            textSize: {
                type: GraphQLInt
            },
            textColor: {
                type: GraphQLString
            }
        }
    }
});
var TextType=new GraphQLObjectType({
    name:'text',
    fields: function (){
        return {
            Xlocation:{
                type: GraphQLInt
            },
            Ylocation:{
                type: GraphQLInt
            },
            textName: {
                type: GraphQLString
            },
            textSize: {
                type: GraphQLInt
            },
            textColor: {
                type: GraphQLString
            }
        }
    }
});
var ImageInputType=new GraphQLInputObjectType({
    name:'imageInput',
    fields: function (){
        return {
            Xlocation:{
                type: GraphQLInt
            },
            Ylocation:{
                type: GraphQLInt
            },
            Url: {
                type: GraphQLString
            },
            ImageHeight: {
                type: GraphQLInt
            },
            ImageWidth: {
                type: GraphQLInt
            }
        }
    }
});
var ImageType=new GraphQLObjectType({
    name:'image',
    fields: function (){
        return {
            Xlocation:{
                type: GraphQLInt
            },
            Ylocation:{
                type: GraphQLInt
            },
            Url: {
                type: GraphQLString
            },
            ImageHeight: {
                type: GraphQLInt
            },
            ImageWidth: {
                type: GraphQLInt
            }
        }
    }
});

var logoType = new GraphQLObjectType({
    name: 'logo',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            text: {
                type: GraphQLString
            },
            multipletext:{
                type: GraphQLList(TextType)
            },
            backgroundColor: {
                type: GraphQLString
            },
            borderColor: {
                type: GraphQLString
            },
            borderWidth: {
                type: GraphQLInt
            },
            borderRadius: {
                type: GraphQLInt
            },
            padding: {
                type: GraphQLInt
            },
            margin: {
                type: GraphQLInt
            },
            lastUpdate: {
                type: GraphQLDate
            },
            logoWidth: {
                type:GraphQLInt
            },
            logoHeight: {
                type:GraphQLInt
            },
            image:{
                type: GraphQLList(ImageType)
            }
        }
    }
});

var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            logos: {
                type: new GraphQLList(logoType),
                resolve: function () {
                    const logos = LogoModel.find().exec()
                    if (!logos) {
                        throw new Error('Error')
                    }
                    return logos
                }
            },
            logo: {
                type: logoType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const logoDetails = LogoModel.findById(params.id).exec()
                    if (!logoDetails) {
                        throw new Error('Error')
                    }
                    return logoDetails
                }
            },
            getLogoByText: {
                type: new GraphQLList(logoType),
                args: {
                    text: {
                        name: 'text',
                        type: GraphQLString
                    }
                },
                resolve: function(root, params){
                    const logos = LogoModel.find({text: params.text}).exec();
                    if (!logos) {
                        throw new Error('Error');
                    }
                    return logos;
                }
            },
            getLogosByTextContains: {
                type: new GraphQLList(logoType),
                args: {
                    text: {
                        name: 'text',
                        type: GraphQLString
                    }
                },
                resolve: function(root, params){
                    const logos = LogoModel.find({text: {$regex: params.text, $options: 'i'}}).exec();
                    if (!logos) {
                        throw new Error('Error');
                    }
                    return logos;
                }
            }
        }
    }
});

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addLogo: {
                type: logoType,
                args: {
                    text: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    multipletext:{
                        type: new GraphQLNonNull(new GraphQLList(TextInputType)),
                          args:{
                          Xlocation:{type:new GraphQLNonNull(GraphQLInt)},
                          Ylocation:{type:new GraphQLNonNull(GraphQLInt)},
                          textName:{type:new GraphQLNonNull(GraphQLString)},
                          textColor:{type:new GraphQLNonNull(GraphQLString)},
                          textSize:{type:new GraphQLNonNull(GraphQLString)}
                       }      
                    },
                    
                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    logoWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    logoHeight: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    image: {
                        type: new GraphQLNonNull(new GraphQLList(ImageInputType)),
                        args:{
                            Xlocation:{type:new GraphQLNonNull(GraphQLInt)},
                            Ylocation:{type:new GraphQLNonNull(GraphQLInt)},
                            Url:{type:new GraphQLNonNull(GraphQLString)},
                            ImageWidth:{type:new GraphQLNonNull(GraphQLInt)},
                            ImageHeight:{type:new GraphQLNonNull(GraphQLInt)}
                        }
                    }

                },
                resolve: function (root, params) {
                    const logoModel = new LogoModel(params);
                    const newLogo = logoModel.save();
                    if (!newLogo) {
                        throw new Error('Error');
                    }
                    return newLogo
                }
            },
            updateLogo: {
                type: logoType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    text: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    multipletext:{
                        type: new GraphQLNonNull(new GraphQLList(TextInputType)),
                          args:{
                          Xlocation:{type:new GraphQLNonNull(GraphQLInt)},
                          Ylocation:{type:new GraphQLNonNull(GraphQLInt)},
                          textName:{type:new GraphQLNonNull(GraphQLString)},
                          textColor:{type:new GraphQLNonNull(GraphQLString)},
                          textSize:{type:new GraphQLNonNull(GraphQLString)}
                       }      
                    },
                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    logoWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    logoHeight: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    image: {
                         type: new GraphQLNonNull(new GraphQLList(ImageInputType)),
                         args:{
                             Xlocation:{type:new GraphQLNonNull(GraphQLInt)},
                             Ylocation:{type:new GraphQLNonNull(GraphQLInt)},
                             Url:{type:new GraphQLNonNull(GraphQLString)},
                             ImageWidth:{type:new GraphQLNonNull(GraphQLInt)},
                             ImageHeight:{type:new GraphQLNonNull(GraphQLInt)}

                         }
                     }

                },
                resolve(root, params) {
                    return LogoModel.findByIdAndUpdate(params.id,
                        { text: params.text,/////
                            backgroundColor : params.backgroundColor, borderColor : params.borderColor,
                            borderWidth: params.borderWidth, borderRadius: params.borderRadius,
                            padding: params.padding, margin: params.margin, lastUpdate: new Date(),logoWidth: params.logoWidth,
                            logoHeight: params.logoHeight,image:params.image,multipletext:params.multipletext}, function (err) {
                        if (err) return next(err);
                    });
                }
            },
            removeLogo: {
                type: logoType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remLogo = LogoModel.findByIdAndRemove(params.id).exec();
                    if (!remLogo) {
                        throw new Error('Error')
                    }
                    return remLogo;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation});