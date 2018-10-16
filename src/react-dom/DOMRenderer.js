import { PROP_NAMES } from './../react/constants';

function addDomEventListenerToElement(name, value, element) {
  element.addEventListener(name.toLowerCase().substring(2), value);
  return element;
}

function addAttributeToElement(name, value, element) {
  let attrName = name;
  if (name === PROP_NAMES.CLASSNAME) {
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

export function createInstance(type, props) {
  const dom = document.createElement(type);

  applyPropsToDom(dom, props);
}

export function createTextInstance(text) {
  return document.createTextNode(text);
}

export function appendChild(parent, child) {
  parent.appendChild(child);
}
