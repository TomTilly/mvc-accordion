class Model {

  static accordionCount = 1;

  constructor() {
    this.panels = [
      {
        id: `${Model.accordionCount}-0`,
        title: 'Title 1',
        body: `<p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
            adipisci quia sunt a numquam, fugit sint quis consectetur, vero est
            placeat, optio exercitationem cum molestiae odio? Consectetur sunt
            aperiam quis.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
            adipisci quia sunt a numquam, fugit sint quis consectetur, vero est
            placeat, optio exercitationem cum molestiae odio? Consectetur sunt
            aperiam quis.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
            adipisci quia sunt a numquam, fugit sint quis consectetur, vero est
            placeat, optio exercitationem cum molestiae odio? Consectetur sunt
            aperiam quis.
          </p>`,
        isOpen: true,
      },
      {
        id: `${Model.accordionCount}-1`,
        title: 'Title 2',
        body: `<p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
            adipisci quia sunt a numquam, fugit sint quis consectetur, vero est
            placeat, optio exercitationem cum molestiae odio? Consectetur sunt
            aperiam quis.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
            adipisci quia sunt a numquam, fugit sint quis consectetur, vero est
            placeat, optio exercitationem cum molestiae odio? Consectetur sunt
            aperiam quis.
          </p>
          <img src="https://unsplash.it/200" alt="">`,
        isOpen: false,
      },
      {
        id: `${Model.accordionCount}-2`,
        title: 'Title 3',
        body: `<h2>Subheader</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
          adipisci quia sunt a numquam, fugit sint quis consectetur, vero est
          placeat, optio exercitationem cum molestiae odio? Consectetur sunt
          aperiam quis.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
          adipisci quia sunt a numquam, fugit sint quis consectetur, vero est
          placeat, optio exercitationem cum molestiae odio? Consectetur sunt
          aperiam quis.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
          adipisci quia sunt a numquam, fugit sint quis consectetur, vero est
          placeat, optio exercitationem cum molestiae odio? Consectetur sunt
          aperiam quis.
        </p>`,
        isOpen: false,
      },
    ];

    Model.accordionCount += 1;
  }

  addPanel(title, body) {
    const panel = {
      id:
        this.panels.length > 0 ? this.panels[this.panels.length - 1].id + 1 : 1,
      title,
      body,
      isOpen: false,
    };
    this.panels.push(panel);
    this.onPanelStateChange(this.panels);
  }

  deletePanel(id) {
    this.panels = this.panels.filter((panel) => panel.id !== id);

    this.onPanelStateChange(this.panels);
  }

  toggleOpen(id) {
    if(this.checkIsOpen(id)) return; // Don't toggle if panel clicked is already open
    this.panels = this.panels.map((panel) => {
      if (panel.isOpen) {
        return { ...panel, isOpen: false }; // Close currently open panel
      } else {
        return panel.id === id ? { ...panel, isOpen: !panel.isOpen } : panel; // Open clicked panel
      }
    });

    this.onPanelStateChange(this.panels);
  }

  checkIsOpen(id) {
    const panel = this.panels.find(panel => {
      return panel.id === id;
    });
    return panel.isOpen;
  }

  bindPanelStateChange(callback) {
    this.onPanelStateChange = callback;
  }
}

class View {

  constructor() {
    this.app = this.getElement('#root');
    this.title = this.createElement('h1');
    this.title.textContent = 'MVC Accordion';

    this.accordion = this.createElement('div', 'accordion');
    this.accordion.setAttribute('role', 'tablist');

    this.app.append(this.title, this.accordion);
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);

    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }

  displayPanels(panels) {
    while(this.accordion.firstChild) {
      this.accordion.removeChild(this.accordion.firstChild);
    }

    if (panels.length === 0 ) {
      const p = this.createElement('p');
      p.textContent = 'No content to show';
      this.accordion.append(p);
    } else {
      panels.forEach((panel, i) => {
        const panelContainer = this.createElement('div', 'accordion__panel');
        const titleId = panel.id;
        const bodyId = `body-${panel.id}`;
        
        const panelHeader = this.createElement('header', 'accordion__panel-header');
        panelHeader.tabindex = "0";
        panelHeader.id = titleId;
        panelHeader.setAttribute('role', 'tab');
        panelHeader.setAttribute('aria-selected', panel.isOpen.toString());
        panelHeader.setAttribute('aria-expanded', panel.isOpen.toString());
        panelHeader.setAttribute('aria-controls', bodyId);
        
        const panelTitle = this.createElement('h2', 'accordion__panel-title');
        panelTitle.textContent = panel.title;
        panelHeader.append(panelTitle);

        const panelBody = this.createElement('div', 'accordion__panel-body');
        panelBody.id = bodyId;
        panelBody.setAttribute('role', 'tabpanel');
        panelBody.setAttribute('aria-labelledby', titleId);
        panelBody.hidden = !panel.isOpen;
        panelBody.innerHTML = panel.body;

        panelContainer.append(panelHeader, panelBody);

        this.accordion.append(panelContainer);
      });
    }
  }

  bindToggleOpen(handler) {
    this.accordion.addEventListener('click', event => {
      if(event.target.className === 'accordion__panel-header') {
        handler(event.target.id);
      }
    });
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.onPanelChange = this.onPanelChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.model.bindPanelStateChange(this.onPanelChange);
    this.view.bindToggleOpen(this.handleToggle);
    this.onPanelChange(this.model.panels);
  }

  onPanelChange(panels) {
    this.view.displayPanels(panels);
  }

  handleToggle(id) {
    this.model.toggleOpen(id);
  }
}

const app = new Controller(new Model(), new View());
