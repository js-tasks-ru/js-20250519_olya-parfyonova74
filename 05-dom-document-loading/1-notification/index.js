export default class NotificationMessage {

    static lastShownComponent;
    element;
    timerId;

    constructor(message = '', params = {type: 'success', duration: 1000}) {
      this.message = message;
      this.duration = params.duration;
      this.type = params.type;

      this.element = this.createElement(this.createTemplate());
    }

    createElement(template) {
      const element = document.createElement('div');
      element.innerHTML = template;
  
      return element.firstElementChild;
    }

    createTemplate() {
      return `
          <div class="notification ${this.type}" style="--value:${this.duration}ms">
            <div class="timer"></div>
            <div class="inner-wrapper">
              <div class="notification-header">${this.type}</div>
              <div class="notification-body">
                ${this.message}
              </div>
            </div>
          </div>`;
    }

    show(div) {
      if (NotificationMessage.lastShownComponent) {
        NotificationMessage.lastShownComponent.remove();
      }

      NotificationMessage.lastShownComponent = this;


      if (div) {
        div.append(this.element);
      } else {
        document.body.append(this.element);
      }

      this.timerId = setTimeout(() => { 
        this.remove();
      }, this.duration);
    }

    remove() {
      this.destroy();
    }

    destroy() {
      this.element.remove();
      clearTimeout(this.timerId);
    }

}
