import Symbols from './../react/symbols';
import CONSTANTS from './../react/constants';

function ReactRoot(container) {
  this.root = Reconciler.createContainer(container);
}

ReactRoot.prototype.render = function (children) {
  Reconciler.updateContainer(children, this.root);
};

function createRootFromDomContainer(container) {
  let rootSibling = container.lastChild;
  while (rootSibling) {
    container.removeChild(rootSibling);
    rootSibling = container.lastChild;
  }
  return new ReactRoot(container);
}

function renderSubtreeIntoContainer(parentComponent, children, container) {
  let root = container._reactRootContainer;

  if (!root) {
    root = container._reactRootContainer = createRootFromDomContainer(container);
  }

  root.render(children);
}

function render(element, container) {
  return renderSubtreeIntoContainer(
    null,
    element,
    container
  );
}

export default {
  render,
};
