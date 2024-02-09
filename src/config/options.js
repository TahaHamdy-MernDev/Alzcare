module.exports = {
  corsOptions: {
    origin: "*", // Allow requests from any origin
    credentials: true, // Allow sending credentials (cookies, authorization headers, etc.)
  },

  helmetOptions: {
    crossOriginEmbedderPolicy: false, // Disable Cross-Origin Embedder Policy
    crossOriginResourcePolicy: {
      allowOrigins: ["*"], // Allow requests from any origin
    },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["*"], // Allow loading resources from any origin
        scriptSrc: ["* data: 'unsafe-eval' 'unsafe-inline' blob:"], // Allow inline scripts and eval() function, as well as loading scripts from data URIs and blob URIs
      },
    },
  },
  mongoSanitizeOptions: {
    dryRun: true, // Enable dry run mode for sanitization
    onSanitize: ({ req, key }) => {
      console.warn(`[DryRun] This request[${key}] will be sanitized`, req); // Log a warning message when a request will be sanitized
    },
  },
};
