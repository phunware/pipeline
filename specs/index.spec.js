'use strict';
const { expect } = require('chai');
const fs = require('fs');
const path = require('path');

const copyWithModule = require('../src/index');

describe('index', function () {
  it('should export all functions', function () {
    const files = fs.readdirSync(path.join(__dirname, '../src'));
    const funcNames = files
      .filter(f => f.endsWith('.js') && f !== 'index.js')
      .map(f => path.basename(f, '.js'));

    const expectedModule = funcNames.reduce((obj, f) =>
      Object.assign(obj, {[f]: require(path.join(__dirname, '../src', f))})
    , {});

    expect(copyWithModule).to.deep.equal(expectedModule);
  });
});
