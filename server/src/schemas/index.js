const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Weather {
    id: ID!
    city: String!
    temperature: Float!
    description: String!
    icon: String!
    date: String!
  }

  type Query {
    getCurrentWeather(city: String!): Weather
    getWeatherHistory(city: String!, from: String!, to: String!): [Weather]
  }
`;

module.exports = typeDefs;
