import Symbols from './symbols';

function createElement(type, prps, ...children) {
  const createTextElement = text => createElement(Symbols.TEXT_ELEMENT, { nodeValue: text });

  const props = Object.assign({}, prps);
  const rawChildren = children.length ? [].concat(...children) : [];

  props.children = rawChildren
    .filter(child => child)
    .map(child => (typeof (child) === 'string' ? createTextElement(child) : child));

  return {
    type,
    props,
  };
}

export default {
  createElement,
};
