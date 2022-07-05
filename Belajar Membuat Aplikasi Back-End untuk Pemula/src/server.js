/* Submission Dikoding Bookshelf API by David Fauzi
Note : ESLINT menggunakan style guide AirBnB */

const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      // Menerapkan CORS dengan cakupan seluruh route di server
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
