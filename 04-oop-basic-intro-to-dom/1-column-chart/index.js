export default class ColumnChart {

    element; 
    chartHeight = 50;

    constructor({
      data = [],
      label = '',
      value = 0,
      link = '',
      formatHeading = value => value
    } = {}) {
      this.label = label;
      this.link = link;
      this.value = value;
      this.formatHeading = formatHeading;
      this.data = data;
      this.element = this.createElement(this.createTemplate());
    }

    createElement(template) {
      const element = document.createElement('div');
      element.innerHTML = template;

      return element.firstElementChild;

    }

    createLinkTemplate(link) {
      if (link) {
        return (`
                <a href="${this.link}" class="column-chart__link">View all</a>
              `);
      } else {
        return ``;
      }

    }

    getColumnProps(data) {
      const maxValue = Math.max(...data);
      const scale = 50 / maxValue;
      
      return data.map(item => {
        return {
          percent: (item / maxValue * 100).toFixed(0) + '%',
          value: String(Math.floor(item * scale))
        };
      });
    }

    createChartClasses() {
      return 'column-chart' + (this.data.length > 0 ? '' : ' column-chart_loading');
    }

    createChartBodyTemplate() {
      return this.getColumnProps(this.data).map(({percent, value}) => {
        return `
                <div style="--value: ${value}" data-tooltip="${percent}"></div>
            `;
      }).join('');
    }

    createTemplate() {
      return (`
        <div class="${this.createChartClasses()}" style="--chart-height: 50">
            <div class="column-chart__title">
                ${this.label}
                ${this.createLinkTemplate(this.link)}
            </div>
            <div class="column-chart__container">
                <div data-element="header" class="column-chart__header">${this.formatHeading(this.value) }</div>
                <div data-element="body" class="column-chart__chart">
                    ${this.createChartBodyTemplate()}
                </div>
            </div>
        </div>
        `);
    }

    update(newData) {
      this.data = newData;
      this.element.querySelector('[data-element="body"]').innerHTML = this.createChartBodyTemplate();
    }
  
    destroy() {
      this.remove();
    }

    remove() {
      this.element.remove();
    }
}
