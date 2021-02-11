class Model {
  constructor() {
    this.panels = [
      {
        id: 1,
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
        id: 2,
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
        id: 3,
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
  }

  addPanel(title, body) {
    const panel = {
      id:
        this.panels.length > 0 ? this.panels[this.panels.length - 1].id + 1 : 1,
      title,
      body,
      complete: false,
    };
    this.panels.push(panel);
  }

  deletePanel(id) {
    this.panels = this.panels.filter((panel) => panel.id !== id);
  }

  toggleOpen(id) {
    this.panels = this.panels.map((panel) =>
      panel.id === id ? { ...panel, isOpen: !panel.isOpen } : panel
    );
  }
}

class View {

  static accordionCount = 1;

  constructor() {
    this.app = this.getElement('#root');
    this.id = View.accordionCount;

    this.title = this.createElement('h1');
    this.title.textContent = 'MVC Accordion';

    this.accordion = this.createElement('div', 'accordion');
    this.accordion.setAttribute('role', 'tablist');

    this.app.append(this.title, this.accordion);

    View.accordionCount += 1;
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
        const titleId = `header-${this.id}-${i}`;
        const bodyId = `body-${this.id}-${i}`;
        
        const panelHeader = this.createElement('header', 'accordion__panel-header');
        panelHeader.tabindex = "0";
        panelHeader.setAttribute('role', 'tab');
        panelHeader.setAttribute('aria-selected', panel.isOpen.toString());
        panelHeader.setAttribute('aria-expanded', panel.isOpen.toString());
        panelHeader.setAttribute('aria-controls', bodyId);
        
        const panelTitle = this.createElement('h2', 'accordion__panel-title');
        panelTitle.id = titleId;
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
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.onPanelToggle(this.model.panels);
  }

  onPanelToggle(panels) {
    this.view.displayPanels(panels);
  }
}

const app = new Controller(new Model(), new View());
