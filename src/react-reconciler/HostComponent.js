import Symbols from './../react/symbols';
import instantiate from './instantiate';

export default class HostComponent {
  constructor(element, renderer) {
    this.currentElement = element;
    this.renderedChildren = [];
    this.node = null;
    this.renderer = renderer;
  }

  getPublicInstance() {
    return this.node;
  }

  mount() {
    const element = this.currentElement;
    const {
      renderer,
    } = this;
    const {
      type,
      props,
    } = element;
    let children = props.children || [];
    if (!Array.isArray(children)) {
      children = [children];
    }

    const isTextElement = type === Symbols.TEXT_ELEMENT;

    const node = isTextElement
      ? renderer.createTextInstance(props.nodeValue)
      : renderer.createInstance(type, props);

    this.node = node;

    const renderedChildren = children.map(child => instantiate(child, renderer));
    this.renderedChildren = renderedChildren;

    const childNodes = renderedChildren.map(child => child.mount());
    childNodes.forEach(childNode => renderer.appendChild(node, childNode));

    return node;
  }

  unmount() {
    this.renderedChildren.forEach(child => child.unmount());
  }
}
