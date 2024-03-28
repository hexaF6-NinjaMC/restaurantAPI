const options = {
  customSiteTitle: "Swagger UI - Restaurant API",
  paths: {
    "/auth/admin/login": {
      get: {
        tags: ["Auth-Admin"],
        description: "",
        responses: {
          default: {
            description: ""
          }
        }
      }
    },
    "/auth/admin/logout": {
      get: {
        tags: ["Auth-Admin"],
        description: "",
        responses: {
          default: {
            description: ""
          }
        }
      }
    },
    "/auth/user/login": {
      get: {
        tags: ["Auth-User"],
        description: "",
        responses: {
          default: {
            description: ""
          }
        }
      }
    },
    "/auth/user/logout": {
      get: {
        tags: ["Auth-User"],
        description: "",
        responses: {
          default: {
            description: ""
          }
        }
      }
    },
    "/admin/": {
      get: {
        tags: ["Admin"],
        description: "",
        responses: {
          200: {
            description: "OK"
          },
          401: {
            description: "Unauthorized"
          }
        }
      },
      post: {
        tags: ["Admin"],
        description: "",
        responses: {
          200: {
            description: "OK"
          }
        }
      }
    },
    "/admin/create": {
      get: {
        tags: ["Admin"],
        description: "",
        responses: {
          200: {
            description: "OK"
          },
          401: {
            description: "Unauthorized"
          }
        }
      }
    },
    "/admin/update": {
      get: {
        tags: ["Admin"],
        description: "",
        responses: {
          200: {
            description: "OK"
          },
          401: {
            description: "Unauthorized"
          }
        }
      }
    },
    "/admin/delete": {
      get: {
        tags: ["Admin"],
        description: "",
        responses: {
          200: {
            description: "OK"
          },
          401: {
            description: "Unauthorized"
          }
        }
      }
    },
    "/admin/{id}": {
      put: {
        tags: ["Admin"],
        description: "",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          200: {
            description: "OK"
          }
        }
      },
      delete: {
        tags: ["Admin"],
        description: "",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          200: {
            description: "OK"
          }
        }
      }
    },
    "/user/": {
      get: {
        tags: ["User"],
        description: "",
        responses: {
          200: {
            description: "OK"
          },
          401: {
            description: "Unauthorized"
          }
        }
      }
    },
    "/user/{id}": {
      get: {
        tags: ["User"],
        description: "",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          200: {
            description: "OK"
          },
          401: {
            description: "Unauthorized"
          }
        }
      },
      put: {
        tags: ["User"],
        description: "",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          200: {
            description: "OK"
          },
          401: {
            description: "Unauthorized"
          }
        }
      },
      delete: {
        tags: ["User"],
        description: "",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          200: {
            description: "OK"
          },
          401: {
            description: "Unauthorized"
          }
        }
      }
    },
    "/user/register": {
      post: {
        tags: ["User"],
        description: "",
        responses: {
          200: {
            description: "OK"
          }
        }
      }
    },
    "/user/login": {
      post: {
        tags: ["User"],
        description: "",
        responses: {
          200: {
            description: "OK"
          }
        }
      }
    },
    "/order/": {
      get: {
        tags: ["Orders"],
        description: "",
        responses: {
          200: {
            description: "OK"
          },
          401: {
            description: "Unauthorized"
          }
        }
      },
      post: {
        tags: ["Orders"],
        description: "",
        responses: {
          200: {
            description: "OK"
          },
          401: {
            description: "Unauthorized"
          }
        }
      }
    },
    "/order/{id}": {
      get: {
        tags: ["Orders"],
        description: "",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          200: {
            description: "OK"
          }
        }
      },
      put: {
        tags: ["Orders"],
        description: "",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          200: {
            description: "OK"
          },
          401: {
            description: "Unauthorized"
          }
        }
      },
      delete: {
        tags: ["Orders"],
        description: "",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          200: {
            description: "OK"
          }
        }
      }
    },
    "/order/user/{id}": {
      get: {
        tags: ["Orders"],
        description: "",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          200: {
            description: "OK"
          },
          401: {
            description: "Unauthorized"
          }
        }
      }
    },
    "/inventory/": {
      get: {
        tags: ["Inventory"],
        description: "",
        responses: {
          200: {
            description: "OK"
          }
        }
      },
      post: {
        tags: ["Inventory"],
        description: "",
        responses: {
          200: {
            description: "OK"
          },
          401: {
            description: "Unauthorized"
          }
        }
      }
    },
    "/inventory/{id}": {
      get: {
        tags: ["Inventory"],
        description: "",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          200: {
            description: "OK"
          }
        }
      },
      put: {
        tags: ["Inventory"],
        description: "",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          200: {
            description: "OK"
          },
          401: {
            description: "Unauthorized"
          }
        }
      },
      delete: {
        tags: ["Inventory"],
        description: "",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          200: {
            description: "OK"
          },
          401: {
            description: "Unauthorized"
          }
        }
      }
    }
  }
};

module.exports = options;
