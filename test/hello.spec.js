import "babel-polyfill";
import "mocha";
import greet from "../dist/js/bundle.min";
import { expect } from "chai";

describe("hello", function() {
  it("should say Hello to the World", function() {
    expect(greet("World")).toEqual("Hello, World!");
  });
});
