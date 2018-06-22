const test = require("tape");
const VulcanSchemasGenerator = require("../src/converters/shemaorg");
const {
  _normalizeGraph,
  _generateVulcanSchemas,
  _getSchemas,
  _getGraph,
  SCHEMAS_PATH
} = VulcanSchemasGenerator;

test("define the correct functions", t => {
  t.ok(_generateVulcanSchemas);
  t.ok(_normalizeGraph);
  t.end();
});

test("get the schemas", t => {
  const schemas = _getSchemas(SCHEMAS_PATH);
  t.ok(typeof schemas === "object");
  t.ok(Object.keys(schemas).length > 0);
  t.end();
});
test("get the graph", t => {
  const graph = _getGraph(_getSchemas(SCHEMAS_PATH));
  t.ok(Array.isArray(graph));
  t.ok(graph.length > 0);
  t.end();
});

const coffeeShop = {
  "@id": "http://schema.org/CafeOrCoffeeShop"
};
const restaurant = {
  "@id": "http://schema.org/Restaurant"
};
test("normalize a schema with no domains", t => {
  const graph = [coffeeShop];
  const result = { [coffeeShop["@id"]]: coffeeShop };
  const normalizedGraph = _normalizeGraph(graph);
  t.ok(typeof normalizedGraph === "object");
  t.deepEqual(normalizedGraph, result);
  t.end();
});

const someFieldId = {
  "@id": "http://schema.org/somefield"
};
const someField = {
  ...someFieldId,
  "http://schema.org/domainIncludes": {
    "@id": coffeeShop["@id"]
  }
};
test("normalize a graph (one field one domain)", t => {
  const graph = [coffeeShop, someField];
  const result = {
    [coffeeShop["@id"]]: {
      ...coffeeShop,
      domains: { [someField["@id"]]: someFieldId }
    },
    [someField["@id"]]: someField
  };
  const normalizedGraph = _normalizeGraph(graph);
  t.ok(typeof normalizedGraph === "object");
  t.deepEqual(normalizedGraph, result);
  t.end();
});
test("normalize a graph (one field many domains)", t => {
  const someField = {
    ...someFieldId,
    "http://schema.org/domainIncludes": [
      {
        "@id": coffeeShop["@id"]
      },
      {
        "@id": restaurant["@id"]
      }
    ]
  };
  const graph = [coffeeShop, restaurant, someField];
  const result = {
    [coffeeShop["@id"]]: {
      ...coffeeShop,
      domains: { [someField["@id"]]: someFieldId }
    },
    [restaurant["@id"]]: {
      ...restaurant,
      domains: { [someField["@id"]]: someFieldId }
    },
    [someField["@id"]]: someField
  };
  const normalizedGraph = _normalizeGraph(graph);
  t.ok(typeof normalizedGraph === "object");
  t.deepEqual(normalizedGraph, result);
  t.end();
});
test("normalize a graph when domain not yet seen(one field many domains)", t => {
  const someField = {
    ...someFieldId,
    "http://schema.org/domainIncludes": [
      { "@id": "http://schema.org/CafeOrCoffeeShop" },
      { "@id": "http://schema.org/Restaurant" }
    ]
  };
  const graph = [coffeeShop, someField];
  const result = {
    [coffeeShop["@id"]]: {
      ...coffeeShop,
      domains: { [someField["@id"]]: someFieldId }
    },
    [restaurant["@id"]]: {
      domains: { [someField["@id"]]: someFieldId }
    },
    [someField["@id"]]: someField
  };
  const normalizedGraph = _normalizeGraph(graph);
  t.ok(typeof normalizedGraph === "object");
  t.deepEqual(normalizedGraph, result);
  t.end();
});

test("remove the domainIncludes field from domains", t => {
  const graph = [coffeeShop, someField];
  const result = someFieldId;
  const normalizedGraph = _normalizeGraph(graph);
  t.deepEqual(
    normalizedGraph[coffeeShop["@id"]].domains[someField["@id"]],
    result
  );
  t.end();
});
