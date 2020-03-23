const { PrismaClient } = require('@prisma/client');
// const { GraphQLServer } = require('graphql-yoga');
const { GraphQLServerLambda } = require('graphql-yoga')

const prisma = new PrismaClient();

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: async (_, { name }, ctx) => {
        const {title} = await ctx.prisma.post.findOne({where: {post_id: 1}})
        return title;
    },
  },
};

const lambda = new GraphQLServerLambda({ typeDefs, resolvers, context: { prisma },  });

exports.handler = lambda.handler;