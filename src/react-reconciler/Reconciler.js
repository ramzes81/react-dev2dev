import { createElement } from './../react-dom/ReactDOMComponent';

function Root(domContainer) {
  this.domContainer = domContainer;
  this.current = null;
}

function createContainer(container) {
  return new Root(container);
}

function updateContainer(children, root) {
  const nextElement = createElement(children.type, children.props, window.document);
  if (root.current === null) {
    root.domContainer.appendChild(nextElement.dom);
  } else {
    root.domContainer.replaceChild(nextElement.dom, root.domContainer.lastChild);
  }
  // eslint-disable-next-line
  root.current = nextElement;
}


export default {
  createContainer,
  updateContainer,
};
