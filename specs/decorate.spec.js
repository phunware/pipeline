'use strict';
const { expect } = require('chai');
const { spy } = require('sinon');
const decorate = require('../src/decorate');

describe('decorate', function () {
  it('should call functions in turn', function () {
    const connect = spy(component => ({ connected: true, child: component }));
    const createContainer = spy(component => ({ container: true, child: component }));

    const component = { render: 'just-pretend-its-a-function' };
    const wrappedComponent = decorate(
      createContainer,
      connect,
      component
    );
    expect(connect).to.have.been.calledWith({ render: 'just-pretend-its-a-function' });
    expect(createContainer).to.have.been.calledWith(({ connected: true, child: { render: 'just-pretend-its-a-function' } }));
    expect(wrappedComponent).to.deep.equal({
      container: true,
      child: {
        connected: true,
        child: {
          render: 'just-pretend-its-a-function'
        }
      }
    });
  });
});
