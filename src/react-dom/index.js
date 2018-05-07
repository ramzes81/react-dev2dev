import Symbols from './../react/symbols';
import CONSTANTS from './../react/constants';

function addDomEventListenerToElement(name, value, element) {
  element.addEventListener(name.toLowerCase().substring(2), value);
  return element;
}

function addAttributeToElement(name, value, element) {
  if (typeof element.setAttribute === 'function') {
    element.setAttribute(name, value);
  } else {
    // eslint-disable-next-line
    element[name] = value;
  }
  return element;
}

const isListener = propName => propName.startsWith('on');
const isAttribute = propName => !isListener(propName) && propName !== CONSTANTS.PROP_NAMES.CHILDREN;

function applyPropsToDom(dom, props) {
  const propKeys = Object.keys(props);
  propKeys
    .filter(isListener)
    .forEach(propName => addDomEventListenerToElement(propName, props[propName], dom));
  propKeys
    .filter(isAttribute)
    .forEach(propName => addAttributeToElement(propName, props[propName], dom));
}

function render(element, container) {
  const {
    type,
  } = element;

  const isTextElement = element.type === Symbols.TEXT_ELEMENT;
  const dom = isTextElement
    ? document.createTextNode(element.props.nodeValue)
    : document.createElement(type);

  applyPropsToDom(dom, element.props);

  const children = element.props.children || [];
  children.forEach(child => render(child, dom));
  container.appendChild(dom);
}

export default {
  render,
};
