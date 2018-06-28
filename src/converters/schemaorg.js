/**
 * Convert a normalized schemaorg schema into a Vulcan schema
 */

// those basic properties are common to any Vulcan schema,
// we add them systematically
const R = require("ramda");
const fs = require("fs");
const path = require("path");
const DEFAULT_PROPS = require("./defaultProperties");
const DEFAULT_FIELD_PROPS = require("./defaultFieldProperties");
const openJSON = require("../utils/openJSON");
const createOutdir = require("../utils/createOutdir");
const JSGenerator = require("../utils/JSGenerator");
const { objField, es6ExportDefault, obj, toField, toFieldStr } = JSGenerator;

const SCHEMAS_PATH = path.resolve(
  __dirname,
  "../../build/schemaorg-normalized.jsonld"
);

const getPropertyLabel = R.pipe(
  R.prop("rdfs:label"),
  toFieldStr("label")
);
const getPropertyType = R.pipe(
  R.always(String),
  toField("type")
);

const isClass = R.propEq("@type", "rdfs:Class");

/**
 * Create a vulcan property
 * @param {*} schema
 */
const convertProperty = propertySchema =>
  obj([
    ...DEFAULT_FIELD_PROPS,
    getPropertyType(propertySchema),
    getPropertyLabel(propertySchema)
  ]);

const convertClass = R.pipe(
  R.prop("fields")
  R.values,
  R.map(field => toField(field["@id"], convertProperty(field))),
  obj
);

const generateVulcanSchemas = R.pipe(
  // right now we handle only classes
  R.filter(isClass),
  R.values, // schemas is an object so we must convert
  R.map(classSchema => toField(classSchema["@id"], convertClass(classSchema))),
  obj,
  es6ExportDefault
);

const run = () => {
  createOutdir();
  R.pipe(
    () => openJSON(SCHEMAS_PATH),
    generateVulcanSchemas,
    data => {
      fs.writeFileSync(
        path.resolve(__dirname, "../../build/", "./schemaorg-vulcanized.js"),
        data,
        { encoding: "utf8", flag: "w" }
      );
    }
  )();
};

module.exports = {
  _convertProperty: convertProperty,
  _convertClass: convertClass,
  _generateVulcanSchemas: generateVulcanSchemas,
  default: run
};
