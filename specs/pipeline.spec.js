'use strict';
const { expect } = require('chai');
const pipeline = () => {};

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
});
