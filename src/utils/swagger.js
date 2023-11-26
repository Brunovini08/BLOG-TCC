import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routes/user-routes.js", "./src/routes/blog-routes.js"];

swaggerAutogen()(outputFile, endpointsFiles);