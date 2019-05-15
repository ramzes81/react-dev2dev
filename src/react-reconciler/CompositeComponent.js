import instantiate from './instantiate';

export default class CompositeComponent {
  constructor(element) {
    this.currentElement = element;
    this.renderedComponent = null;
    this.publicInstance = null;
  }

  getPublicInstance() {
    return this.publicInstance;
  }

  mount() {
    const {
      type,
      props,
    } = this.currentElement;

    const publicInstance = null;
    const renderedElement = type(props);

    this.publicInstance = publicInstance;

    const renderedComponent = instantiate(renderedElement);
    this.renderedComponent = renderedComponent;

    return renderedComponent.mount();
  }

  unmount() {
    if (this.publicInstance) {
      if (this.publicInstance.componentWillUnmount) {
        this.publicInstance.componentWillUnmount();
      }
    }

    this.renderedComponent.unmount();
  }
}
