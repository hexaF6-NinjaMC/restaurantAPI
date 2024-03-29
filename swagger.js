// eslint-disable-next-line import/no-extraneous-dependencies
const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    version: "1.0.0",
    title: "Restaurant API",
    description:
      "Restaurant orders, inventory, users, and administrator management"
  },
  servers: [
    {
      url: "https://restaurantapi-m771.onrender.com/",
      description: "Server for production"
    },
    {
      url: "http://localhost:8080",
      description: "Local server for testing"
    }
  ],
  components: {
    securitySchemes: {
      OAuthAdmin: {
        type: "oauth2",
        flows: {
          authorizationCode: {
            authorizationUrl: "/auth/admin/google/callback",
            scopes: {
              read: "Grants GET requests",
              write: "Grants POST and PUT requests",
              delete: "Grants DELETE requests"
            }
          }
        }
      },
      OAuthUser: {
        type: "oauth2",
        flows: {
          authorizationCode: {
            authorizationUrl: "/auth/user/google/callback",
            scopes: {
              read: "Grants GET requests",
              write: "Grants POST and PUT requests",
              delete: "Grants DELETE requests"
            }
          }
        }
      }
    }
  }
};

const outputFile = "./swagger.json";
const routes = ["./routes/index.js"];

swaggerAutogen(outputFile, routes, doc);
