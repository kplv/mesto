export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setItem(element) {
    this._container.append(element);
  }

  setUserItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    if (Array.isArray(this._renderedItems)) {
      this._renderedItems.forEach(item => {
        this._renderer(item);
      });
    } else {console.log('one'); this._renderer(this._renderedItems)}
  }

  /*   renderItems() {
      console.log(this);
      console.log(this._renderedItems);
      // this._renderedItems.forEach.bind(item => {console.log(item)})
    } */
}
