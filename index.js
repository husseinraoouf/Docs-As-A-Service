const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('./schema');
const cors = require('cors');
const reactViews = require('express-react-views');


// 1
const connectDB = require('./db');

// 2
const start = async () => {
    // 3
    const DB = await connectDB();
    var app = express();
    app.use(cors());

    app.use(express.static(__dirname + '/views'));
    app.use(express.static(__dirname + '/public'));


    const buildOptions = (req, res) => {
        const HEADER_REGEX = /bearer (.*)$/i;
        const jwt = ( req.headers.authorization && req.headers.authorization != "null" && HEADER_REGEX.exec(req.headers.authorization)[1] ) || null;
        return {
            context: { ...DB, jwt}, // This context object is passed to all resolvers.
            schema,
        };
    };

    app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));

    app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql',
    }));




    app.get('/', function(req, res) {
      res.sendFile('index.html');
    });



    const PORT = process.argv[2] || 5000;
    app.listen(PORT, () => {
        console.log(`GraphQL server running on port ${PORT}.`)
    });
};

// 5
start();