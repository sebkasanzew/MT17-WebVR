/*
import describe from 'mocha';
import it from 'mocha';
import expect from 'chai.expect';
*/

const expect = require('chai').expect;
import greet from '../src/js/hello';

describe('hello', function() {
  it('should say Hello to the World', function() {
    expect(greet('World')).toEqual('Hello, World!');
  });
});
