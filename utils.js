/* ------- begin view -------- */
export class ModalView {
    constructor(mainContainer, modal) {
        this.container = mainContainer; //document body
        this.myModal = modal; //modal container
        this.myModalOverlay = null;

        this.init();
    }

    init() {
        this.myModalOverlay = this.container.querySelector('#modal-overlay'); //modal shadow
    }

    show(attr = null) {
        this.myModalOverlay.classList.remove('modal_closed'); //show shadow
        this.myModal.classList.remove('modal_closed'); //show modal

        if (attr && attr.supermodalTitle) { //set modal title from data attribute
            const header = this.myModal.querySelector('h2');
            header.textContent = attr.supermodalTitle;
        }

        if (attr && attr.supermodalContent) { //set modal content from data attribute
            const content = this.myModal.querySelector('.modal__content');
            content.textContent = attr.supermodalContent;
        }
    }

    hide() {
        this.myModalOverlay.classList.add('modal_closed');
        this.myModal.classList.add('modal_closed');
    }
};
/* -------- end view --------- */

/* ------- begin model ------- */
export class ModalModel {
    constructor(view) {
        this.myModalView = view;
    }

    showModal(attr) {
        this.myModalView.show(attr);
    }

    closeModal() {
        this.myModalView.hide();
    }

}
/* -------- end model -------- */

/* ----- begin controller ---- */
export class ModalController {
    constructor(model, container, attributes) {
        this.myModalContainer = container; //modal container
        this.myModalModel = model; //model instance
        this.dataAttributes = attributes; //data attributes from modal open btn
        this.modalCancelBtn = null;
        this.modalCloseBtn = null;

        this.init();
    }

    init() {
        this.showModal(); //open modal
        this.findModalElements(); //find elements of the modal
    }

    showModal() {
        this.myModalModel.showModal(this.dataAttributes);
    }

    findModalElements() {
        //find X btn, add listener if found
        if (this.myModalContainer.querySelector('.modal__close')) {
            this.modalCloseBtn = this.myModalContainer.querySelector('.modal__close');
            this.modalCloseBtn.addEventListener('click', event => this.hideModal(event));
        }

        //find Cancel btn, add listener if found
        if (this.myModalContainer.querySelector('.modal__cancel')) {
            this.modalCancelBtn = this.myModalContainer.querySelector('.modal__cancel');
            this.modalCancelBtn.addEventListener('click', event => this.hideModal(event));
        }
    }

    hideModal(event) { //closes modal (on X/Cancel)
        event.preventDefault();
        this.myModalModel.closeModal();
    }
};

/* ------ end controller ----- */