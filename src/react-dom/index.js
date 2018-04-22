import Symbols from './../react/symbols';

function render(element, container) {
  const {
    type,
  } = element;

  const isTextElement = element.type === Symbols.TEXT_ELEMENT;
  const dom = isTextElement
    ? document.createTextNode(element.props.nodeValue)
    : document.createElement(type);

  const children = element.props.children || [];
  children.forEach(child => render(child, dom));
  container.appendChild(dom);
}

export default {
  render,
};
