import { ModalView, ModalModel, ModalController } from './utils.js';

export class App {
    constructor(container) {
        this.page = container;
    }

    init() {
        const openModalBtns = this.page.querySelectorAll(".btn");
        openModalBtns.forEach(btn => {
            btn.addEventListener("click", event => this.getModal(event));
        });
    }

    getModal(event) {
        event.preventDefault();
        const modalDataset = event.target.dataset;
        let modal;
        if (Object.keys(modalDataset).length === 1 && modalDataset.supermodal) {
            modal = this.page.querySelector(`#${modalDataset.supermodal}`);
            this.initModalRendering(modal);
        }
        if (Object.keys(modalDataset).length === 3 && modalDataset.supermodal) {
            modal = this.page.querySelector(`#${modalDataset.supermodal}`);
            let modalAttributes = modalDataset;
            if (modal) {
                this.initModalRendering(modal, modalAttributes);
            } else {
                modal = this.generateNewModal(modalDataset.supermodal);
                this.initModalRendering(modal, modalAttributes);
            }
        }
    }

    generateNewModal(modalId) {
        //create main div
        let modalDiv = document.createElement('div');
        modalDiv.classList.add('modal');
        modalDiv.classList.add('default');
        modalDiv.classList.add('modal_closed');
        modalDiv.id = modalId;

        //create header block
        let modalHeader = document.createElement('header');
        modalHeader.classList.add('modal__header');
        //add title tag
        let headerTitle = document.createElement('h2');

        //create X btn
        let closeBtn = document.createElement('a');
        closeBtn.classList.add('modal__close');
        closeBtn.href = '#';
        closeBtn.id = 'modal-close';
        closeBtn.title = 'Закрыть модальное окно';

        //create content block
        let modalBody = document.createElement('main');
        modalBody.classList.add('modal__content');

        //create footer block with Close btn
        let modalFooter = document.createElement('footer');
        modalFooter.classList.add('modal__footer');
        let footerCloseBtn = document.createElement('button');
        footerCloseBtn.id = 'modal-cancel';
        footerCloseBtn.classList.add('modal__cancel');
        footerCloseBtn.classList.add('default-btn');
        footerCloseBtn.title = 'Закрыть';
        footerCloseBtn.textContent = 'Закрыть';

        modalHeader.append(headerTitle);
        modalDiv.append(modalHeader);
        modalDiv.append(closeBtn);
        modalDiv.append(modalBody);
        modalFooter.append(footerCloseBtn);
        modalDiv.append(modalFooter);
        this.page.append(modalDiv);

        return modalDiv;
    }

    initModalRendering(modal, attributes = null) {
        const appModalView = new ModalView(this.page, modal);
        const appModalModel = new ModalModel(appModalView);
        const appModalController = new ModalController(appModalModel, modal, attributes);
    }
}