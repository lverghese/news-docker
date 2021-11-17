const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers  ={
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('articles')
      
              return userData;
            }
      
            throw new AuthenticationError('Not logged in');
          },
    },
    Mutation: {
        addUser: async (parents, args ) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {token ,user};
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
            return { token, user };
          },

          saveArticle: async(parent, {article}, context) => {
            //console.log(args.input)
             if(context.user){
                 const updatedUser = await User.findOneAndUpdate(
                     {_id: context.user._id},
                    
                     {$addToSet: { savedArticles: article }},
                     { new: true }
                 );
                 return updatedUser;
             }
             throw new AuthenticationError('You need to be logged in!');
           },
            removeArticle:async(parent, args, context) => {
                 if(context.user){
                     const updatedUser = await User.findOneAndUpdate(
                         {_id: context.user._id },
                         {$pull: {savedArticles: { articlesId: args.ArticleId }}},
                         {new: true }
                     );
                     return updatedUser;
                 }
                 throw new AuthenticationError('You need to bbe logged in!');
            }

    }
};

module.exports = resolvers;