class BitPrevNext extends HTMLElement {
  connectedCallback() {
    this.setPreviousNext();

    if (this.hasPrevious()) {
      this.appendChild(this.getAnchorElement(this.previous, true));
    }
    if (this.hasNext()) {
      this.appendChild(this.getAnchorElement(this.next));
    }
  }

  hasNext() {
    return !(this.next.element == null);
  }

  hasPrevious() {
    return !(this.previous.element == null);
  }

  get listSelector() {
    return this.getAttribute('list-selector');
  }

  setPreviousNext() {
    const list = document.querySelectorAll(this.listSelector)[0];
    const currentElement = this.getCurrentElement(list);
    const previousElement = currentElement ? currentElement.parentElement.previousElementSibling : null;
    const nextElement = currentElement ? currentElement.parentElement.nextElementSibling : null;

    const previousNext = function(element) {
      if (element) {
        return {
          element: element,
          title: element.firstElementChild.innerText,
          href: element.firstElementChild.href,
        };
      }
      return {};
    };

    this.previous = previousNext(previousElement);
    this.next = previousNext(nextElement);
  }

  getCurrentElement(list) {
    return Array.from(
      list.querySelectorAll('a')
    ).find(
      (val) => val.href.split('#')[0].split('?')[0] === location.href.split('#')[0].split('?')[0]
    );
  }

  getAnchorElement(previousNextObj, isPrevious) {
    const anchor = document.createElement('a');
    anchor.setAttribute('href', previousNextObj.href);
    anchor.innerText = `${isPrevious ? 'Previous' : 'Next'} Lesson: ${previousNextObj.title}`;
    anchor.title = previousNextObj.title;
    return anchor;
  }
}

BitPrevNext = customElements.define('bit-prev-next', BitPrevNext);

module.exports = BitPrevNext;
