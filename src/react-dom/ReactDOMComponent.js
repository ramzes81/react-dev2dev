import Symbols from './../react/symbols';
import { PROP_NAMES } from './../react/constants';

function addDomEventListenerToElement(name, value, element) {
  element.addEventListener(name.toLowerCase().substring(2), value);
  return element;
}

function addAttributeToElement(name, value, element) {
  let attrName = name;
  if (name === CONSTANTS.PROP_NAMES.CLASSNAME) {
    attrName = 'class';
  }
  if (typeof element.setAttribute === 'function') {
    element.setAttribute(attrName, value);
  } else {
    // eslint-disable-next-line
    element[attrName] = value;
  }
  return element;
}

const isListener = propName => propName.startsWith('on');
const isAttribute = propName => !isListener(propName) && propName !== PROP_NAMES.CHILDREN;

function applyPropsToDom(dom, props) {
  const propKeys = Object.keys(props);
  propKeys
    .filter(isListener)
    .forEach(propName => addDomEventListenerToElement(propName, props[propName], dom));
  propKeys
    .filter(isAttribute)
    .forEach(propName => addAttributeToElement(propName, props[propName], dom));
}

function ReactDOMComponent(dom, type, props, childComponents) {
  this.dom = dom;
  this.type = type;
  this.props = props;
  this.childComponents = childComponents;
}

// eslint-disable-next-line
export function createElement(type, props, rootContainerElement) {
  const isTextElement = type === Symbols.TEXT_ELEMENT;

  const dom = isTextElement
    ? rootContainerElement.createTextNode(element.props[PROP_NAMES.CHILDREN])
    : rootContainerElement.createElement(type);

  applyPropsToDom(dom, props);

  const children = element.props[PROP_NAMES.CHILDREN] || [];

  const childDOMComponents = children.map(child => createElement(child.type, child.props));

  return new ReactDOMComponent(dom, type, props, childDOMComponents);
}
