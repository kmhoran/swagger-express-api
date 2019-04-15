const fs = require("fs");
const path = require("path");

const swaggerExt = ".swagger.ts";

const docDefault = {
    "swagger": "2.0",
    "info": {
      "description": "This is a sample server Petstore server.  You can find out more about     Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).      For this sample, you can use the api key `special-key` to test the authorization     filters.",
      "version": "1.0.0",
      "title": "Swagger Petstore",
      "termsOfService": "http://swagger.io/terms/",
      "contact": {
        "email": "apiteam@swagger.io"
      },
      "license": {
        "name": "Apache 2.0",
        "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
      }
    },
    "host": "petstore.swagger.io",
    "basePath": "/v2",
}

try {
  const config = readConfig();
  const doc = buildDoc();
} catch (err) {
  console.error("ERROR: ", err);
}

function readConfig() {
  const packageJsonPath = path.join(__dirname, "package.json");
  if (fs.existsSync(packageJsonPath)) {
    const { swaggerConfig } = require(packageJsonPath);
    if (swaggerConfig) return swaggerConfig;
    return null;
  }
  throw "No Package JSON";
}

function buildDoc() {
  console.log(extractSwaggerFiles(path.join(__dirname, "src")));
  const data = docDefault;
  writeDoc(path.join(__dirname, "src/swaggerDocument.test.json"), data);
}

function extractSwaggerFiles(rootDir) {
  if (!fs.existsSync(rootDir))
    throw `Could not find file ${rootDir} while extracting swagger files.`;
  const files = fs.readdirSync(rootDir);
  let foundFiles = [];
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(rootDir, files[i]);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory())
      foundFiles = foundFiles.concat(extractSwaggerFiles(filename));
    else if (filename.indexOf(swaggerExt) >= 0) foundFiles.push(filename);
  }
  return foundFiles;
}

function writeDoc(destination, data) {
  if (fs.existsSync(destination)) fs.unlinkSync(destination);
  fs.writeFileSync(destination, JSON.stringify(data));
}
