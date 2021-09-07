class HtmlHelper {
  createElement = (tag, className) => {
    const newTag = document.createElement(tag);
    if (className) {
      newTag.classList.add(className);
    }
    return newTag;
  }

  createItem = (item, index) => {
    const box = this.createElement("div", "js-box");
    const title = this.createElement("h4", "title");
    const description = this.createElement("div", "description");
    const row = this.createElement("div", "row");
    const button1 = this.createElement("button", "buttonInfo");
    const button2 = this.createElement("button", "buttonActive");
    button1.setAttribute("data-info", index);
    button2.setAttribute("data-active", index);

    box.appendChild(title);
    box.appendChild(description);
    box.appendChild(row);
    row.appendChild(button1);
    row.appendChild(button2);

    title.innerText = item.title;
    description.innerText = item.description;
    button1.innerText = "More info";
    button2.innerText = "Finish";

    return box;
  }
}

class App extends HtmlHelper {
  constructor(activeted = ".activeted__body", finished = ".finished__body") {
    super();
    this.activeList = new ProjectList();
    this.finishList = new ProjectList();
    this.modal = new Modal();
    this.activeted = document.querySelector(activeted);
    this.finished = document.querySelector(finished);
  }

  addNewItem(title, description, info) {
    this.activeList.addItem(new ProjectItem(title, description, info));
  }

  renderActiveList() {
    this.activeted.innerHTML = "";
    this.activeList.list.forEach((element, index) => {
      const createdItem = this.createItem(element, index);
      this.activeted.appendChild(createdItem);
    });
  }

  renderFinishList() {
    this.finished.innerHTML = "";
    this.finishList.list.forEach((element, index) => {
      const createdItem = this.createItem(element, index);
      createdItem.lastChild.lastChild.classList.replace("buttonActive", "buttonFinish");
      createdItem.lastChild.lastChild.innerText = "Activate";
      this.finished.appendChild(createdItem);
    });
  }

  activeEvent() {
    this.activeted.querySelectorAll(".buttonActive").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-active");
        const item = this.activeList.removeItem(index);
        this.finishList.addItem(item);
        this.renderLists();
      })
    });
  }

  finishEvent() {
    this.finished.querySelectorAll(".buttonFinish").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-active");
        const item = this.finishList.removeItem(index);
        this.activeList.addItem(item);
        this.renderLists();
      })
    });
  }

  bindInfo() {
    document.querySelectorAll(".buttonInfo").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = btn.getAttribute("data-info");
        if (e.target.closest('.activeted')) {
          this.modal.openModal(this.activeList.getCurrentItemValue(index));
        } else if (e.target.closest('.finished')) {
          this.modal.openModal(this.finishList.getCurrentItemValue(index));
        }
      });
    });
  }

  renderLists() {
    this.renderActiveList();
    this.renderFinishList();
    this.activeEvent();
    this.finishEvent();
    this.bindInfo();
  }
}

class Modal {
  constructor() {
    this.closeModal();
    this.modalBox = document.querySelector(".modal");
    this.modalTitle = document.querySelector(".modal__title");
    this.modalDescription = document.querySelector(".modal__description");
    this.modalInfo = document.querySelector(".modal__info");
  }

  openModal(currentItem) {
    this.modalBox.style.transition = 0.5 + "s";
    this.modalTitle.innerText = currentItem.title;
    this.modalDescription.innerText = currentItem.description;
    this.modalInfo.innerText = currentItem.info;
    this.modalBox.classList.add("open");
  }

  closeModal() {
    document.querySelector(".modal__close").addEventListener("click", () => {
      this.modalBox.classList.remove("open");
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.modalBox.classList.remove("open");
      }
    });
    document.addEventListener("click", (e) => {
      if (this.modalBox.contains(e.target) && !document.querySelector(".modal__content").contains(e.target)) {
        this.modalBox.classList.remove("open");
      }
    });
  }
}

class ProjectList {
  constructor() {
    this.list = [];
  }

  getCurrentItemValue(index) {
    return this.list[index];
  }

  addItem = (item) => {
    this.list.push(item);
  }

  removeItem(index) {
    return this.list.splice(index, 1)[0];
  }
}

class ProjectItem {
  constructor(title, description, info) {
    this.title = title;
    this.description = description;
    this.info = info;
  }
}

const appStart = new App(".activeted__body", ".finished__body");

appStart.addNewItem("Title 1", "Description 1", "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem, esse deleniti obcaecati enim ametnesciunt necessitatibus ? Quod odio ad amet molestias.Sapiente recusandae consequatur esse fugiat cum autearum dolor 1");
appStart.addNewItem("Title 2", "Description 2", "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem, esse deleniti obcaecati enim ametnesciunt necessitatibus ? Quod odio ad amet molestias.Sapiente recusandae consequatur esse fugiat cum autearum dolor 2");
appStart.addNewItem("Title 3", "Description 3", "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem, esse deleniti obcaecati enim ametnesciunt necessitatibus ? Quod odio ad amet molestias.Sapiente recusandae consequatur esse fugiat cum autearum dolor 3");
appStart.addNewItem("Title 4", "Description 4", "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem, esse deleniti obcaecati enim ametnesciunt necessitatibus ? Quod odio ad amet molestias.Sapiente recusandae consequatur esse fugiat cum autearum dolor 4");
appStart.addNewItem("Title 5", "Description 5", "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem, esse deleniti obcaecati enim ametnesciunt necessitatibus ? Quod odio ad amet molestias.Sapiente recusandae consequatur esse fugiat cum autearum dolor 5");
appStart.addNewItem("Title 6", "Description 6", "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem, esse deleniti obcaecati enim ametnesciunt necessitatibus ? Quod odio ad amet molestias.Sapiente recusandae consequatur esse fugiat cum autearum dolor 6");

appStart.renderLists();