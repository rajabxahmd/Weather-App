const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
require('dotenv').config();

const typeDefs = require('./schemas');
const resolvers = require('./resolvers');

async function startServer() {
  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  mongoose.connect("mongodb+srv://rajabxahmd:LDXEbsQkf2NzUBix@mycluster.sw5tnya.mongodb.net/Rajab's-Project?retryWrites=true&w=majority&appName=MyCluster", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("MongoDB connected");
      app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
      });
    })
    .catch(err => console.error(err));
}

startServer();
