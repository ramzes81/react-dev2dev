import HostComponent from './HostComponent';
import CompositeComponent from './CompositeComponent';

export default function instantiate(element, renderer) {
  const {
    type,
  } = element;
  if (typeof type === 'function') {
    return new CompositeComponent(element);
  }
  return new HostComponent(element, renderer);
}
