import instantiate from './instantiate';
import ReactRoot from './ReactRoot';

export default class Reconciler {
  constructor(renderer) {
    this.renderer = renderer;
  }

  // eslint-disable-next-line
  createContainer(container) {
    return new ReactRoot(container);
  }

  updateContainer(children, root) {
    const {
      renderer,
    } = this;
    const nextElement = instantiate(children, renderer);
    if (root.current === null) {
      renderer.appendChild(root.container, nextElement.mount());
    } else {
      renderer.flushContainer(root.container);
      renderer.appendChild(root.container, nextElement.mount());
    }
    // eslint-disable-next-line
    root.current = nextElement;
  }
}
