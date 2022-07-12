import pluralize from "pluralize";

import * as CapableHealthApi from "../codegen";

import { CLASS_OVERRIDES, SUBCLASS_OVERRIDES } from "./overrides";

function isSubclassOverride(namespace: string): boolean {
  return Array.isArray(SUBCLASS_OVERRIDES[namespace]);
}
function isClassOverride(constructorName) {
  return CLASS_OVERRIDES.includes(constructorName);
}
const INVARIABLE_NAMES = Object.values(SUBCLASS_OVERRIDES).reduce(
  (names, values) => {
    return names.concat(values);
  },
  []
);
function isInvariableName(name: string): boolean {
  return INVARIABLE_NAMES.includes(name);
}

// The following constants are pre-compiled key lookups for the client method.
const CONSTRUCTOR_NAMESPACES = Object.getOwnPropertyNames(
  CapableHealthApi
).filter((item) => typeof CapableHealthApi[item] === "function");
const SUB_NAMESPACES = Object.entries(SUBCLASS_OVERRIDES).reduce(
  (subNamespaces, kv) => {
    kv[1].forEach((subNamespace) => (subNamespaces[subNamespace] = kv[0]));
    return subNamespaces;
  },
  {}
);
const SUB_NAMESPACES_LIST = Object.keys(SUB_NAMESPACES);
const API_CLASS_NAMESPACES = CONSTRUCTOR_NAMESPACES.filter((item) =>
  item.endsWith("Api")
)
  .map((item) => {
    if (Object.keys(SUBCLASS_OVERRIDES).includes(item))
      return SUBCLASS_OVERRIDES[item];

    const namespace = item.slice(0, -3);
    return isInvariableName(namespace)
      ? namespace
      : pluralize.singular(namespace);
  })
  .flat();

function isSupportedApiClass(className: string): boolean {
  return API_CLASS_NAMESPACES.includes(className);
}

function constructorNameFor(className) {
  let constructorName: string;
  if (SUB_NAMESPACES_LIST.includes(className))
    constructorName = SUB_NAMESPACES[className];
  else if (isInvariableName(className)) constructorName = className + "Api";
  else constructorName = pluralize(className) + "Api";
  return constructorName;
}

export {
  isSupportedApiClass,
  isSubclassOverride,
  isClassOverride,
  constructorNameFor,
};
