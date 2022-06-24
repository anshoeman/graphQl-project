const express = require('express')
const app = express();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

/*middleware for the graphql*/
app.use('/graphql', graphqlHTTP({
    //this will require a schema
    schema: schema, //or schema only we will write thats fine
    graphiql:process.env.NODE_ENV === true//for dev mode testing
}))
app.listen(PORT, () => console.log(`Server Started at port ${PORT}`));
