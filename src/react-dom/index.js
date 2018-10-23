import Reconciler from './../react-reconciler/Reconciler';
import * as DOMRenderer from './DOMRenderer';

const reconciler = new Reconciler(DOMRenderer);

function ReactRoot(container) {
  this.root = reconciler.createContainer(container);
}

ReactRoot.prototype.render = function (children) {
  reconciler.updateContainer(children, this.root);
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
    // eslint-disable-next-line
    root = container._reactRootContainer = createRootFromDomContainer(container);
  }

  root.render(children);
}

function render(element, container) {
  return renderSubtreeIntoContainer(
    null,
    element,
    container,
  );
}

export default {
  render,
};
