import Symbols from './../react/symbols';
import CONSTANTS from './../react/constants';



function render(element, container) {
  const {
    type,
  } = element;

  children.forEach(child => render(child, dom));
  container.appendChild(dom);
}

export default {
  render,
};
