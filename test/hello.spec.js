/* global it, describe, expect, greet */
/*
import describe from 'mocha';
import it from 'mocha';
import expect from 'mocha';
import greet from 'mocha';
*/

describe('greeter', function() {
  it('should say Hello to the World', function() {
    expect(greet('World')).toEqual('Hello, World!');
  });
});
