'use strict';
const { expect } = require('chai');
const fs = require('fs');
const path = require('path');

const copyWithModule = require('../src/index');
const pipelineFunc = require('../src/pipeline');

describe('index', function () {
  it('should export all functions', function () {
    const files = fs.readdirSync(path.join(__dirname, '../src'));
    const funcNames = files
      .filter(f => f.endsWith('.js') && f !== 'index.js' && f !== 'pipeline.js')
      .map(f => path.basename(f, '.js'));

    expect(copyWithModule).to.equal(pipelineFunc);
    funcNames.forEach(f => {
      expect(copyWithModule[f]).to.equal(require(path.join(__dirname, '../src', f)));
    });
  });
});
