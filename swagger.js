// eslint-disable-next-line import/no-extraneous-dependencies
const swaggerAutogen = require("swagger-autogen")({openapi: "3.0.0"});

const doc = {
  info: {
    version: "1.0.0",
    title: "Restaurant API",
    description: "Restaurant orders, inventory, users, and administrator management"
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "Local server for testing"
    },
    {
      url: "https://render.com",
      description: "Server for production"
    }
  ],
  tags: [
    {
      name: "hello world",
      description: "General greetings or introductory information"
    },
    {
      name: "orders",
      description: "Endpoints related to managing restaurant orders"
    },
    {
      name: "users",
      description: "Endpoints related to managing users"
    },
    {
      name: "inventory",
      description: "Endpoints related to managing restaurant inventory"
    },
    {
      name: "admin",
      description: "Endpoints related to administrator management"
    },
    {
      name: "auth",
      description: "Endpoints related to authentication"
    },
    {
      name: "logout",
      description: "Endpoint for logging out users"
    }
  ],
  components: {}
};

const outputFile = "./swagger.json";
const routes = ["./routes/admin.js", "./routes/index.js", "./routes/orders.js", "./routes/inv.js", "./routes/auth.js", "./routes/users.js"];

swaggerAutogen(outputFile, routes, doc);
