'use strict';
const { expect } = require('chai');
const { spy } = require('sinon');
const pipeline = require('../src/pipeline');

describe('pipeline', function () {
  //  inspired by https://github.com/mindeavor/es-pipeline-operator/blob/master/README.md
  describe('example cases', function () {
    it('should pipe a value through example functions', function () {
      function doubleSay (str) {
        return str + ", " + str;
      }
      function capitalize (str) {
        return str[0].toUpperCase() + str.substring(1);
      }
      function exclaim (str) {
        return str + '!';
      }
      const result = pipeline('hello',
        doubleSay,
        capitalize,
        exclaim
      );
      expect(result).to.equal('Hello, hello!');
    });

    it('should work with arrow functions for multiple arguments', function () {
      function double (x) { return x + x; }
      function add (x, y) { return x + y; }

      function boundScore (min, max, score) {
        return Math.max(min, Math.min(max, score));
      }

      const person = { score: 25 };
      const newScore = pipeline(person.score,
        double,
        _ => add(7, _),
        _ => boundScore(0, 100, _)
      );
      expect(newScore).to.equal(57);
    });
  });

  it('should call each function in turn', function () {
    const spy1 = spy(() => 1);
    const spy2 = spy(() => 2);
    const spy3 = spy(() => 3);

    const finalValue = pipeline(0, spy1, spy2, spy3);
    expect(spy1).to.have.been.calledWith(0);
    expect(spy2).to.have.been.calledWith(1);
    expect(spy3).to.have.been.calledWith(2);
    expect(finalValue).to.equal(3);
  });
});
