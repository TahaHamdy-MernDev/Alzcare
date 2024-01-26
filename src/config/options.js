module.exports = {
  corsOptions: {
    origin: "*",
    credentials: true,
  },

  helmetOptions: {
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: {
      allowOrigins: ["*"],
    },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["*"],
        scriptSrc: ["* data: 'unsafe-eval' 'unsafe-inline' blob:"],
      },
    },
  },
  mongoSanitizeOptions: {
    dryRun: true,
    onSanitize: ({ req, key }) => {
      console.warn(`[DryRun] This request[${key}] will be sanitized`, req);
    },
  },
};
