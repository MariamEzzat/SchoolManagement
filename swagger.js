const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'School Management APIs',
      version: '1.0.0',
      description: 'Management of school apis',
    },
  },
  apis: ['./Auth/Route.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);
module.exports = specs;

// module.exports = (app) => {
//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// };

