const {
    makeExecutableSchema,
    addResolveFunctionsToSchema
} = require('graphql-tools');
const resolvers = require('./resolvers');



const typeDefs = `
    type Query {
        allkeyword: [Keyword]
        keyword(id: String, keyword: String, keywordkind: String, language: String): Keyword
    }

    type Mutation {
        createKeyword( Data: keywordInput): Keyword
        updateKeyword(id: String!, Data: keywordInput): Keyword
        deleteKeyword(id: String!): MutationStatus
    }

    interface Keyword{
        id: ID!
        keyword: String!
        keywordkind: keywordKind!
        status: Status
        link: Url
    }

    type HTMLTag implements Keyword {
        id: ID!
        keyword: String!
        keywordkind: keywordKind!
        language: String!
        status: Status
        link: Url
        difintion: String
        examples: [Example]
        attributes: [Attribute]
    }

    type HTMLAttribute implements Keyword {
        id: ID!
        keyword: String!
        keywordkind: keywordKind!
        status: Status
        link: Url
        tags: [String!]
    }

    scalar Url

    enum Status {
        working
        obsolete
        html5
        deprecated
        experimental
        not standardized
    }


    enum MutationStatus {
        OK
        Fail
    }

    enum keywordKind {
        tag
        attribute
    }

    type Example{
        title: String
        code: String
        note: String
        link: Url
    }


    type Attribute{
        name: String
        status: Status
        details: String
        note: String
    }


    input inputExample{
        title: String
        code: String
        note: String
        link: Url
    }


    input inputAttribute{
        name: String
        status: Status
        details: String
        note: String
    }

    input keywordInput {
        keyword: String
        keywordkind: String
        status: Status
        link: String
        difintion: String
        examples: [inputExample]
        attributes: [inputAttribute]
        tags: [String!]
    }

`;



const resolverMap = {
  Keyword: {
    __resolveType(obj, context, info) {
      if (obj.keywordkind == "tag") {
        return "HTMLTag";
      }

      if (obj.keywordkind == "attribute") {
        return "HTMLAttribute";
      }

      return null;
    }
  }
}


// Generate the schema object from your types definition.
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

addResolveFunctionsToSchema(schema, resolverMap);

module.exports = schema;