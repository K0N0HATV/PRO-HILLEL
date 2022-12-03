class FormView extends View {
    static INPUT_SELECTOR = 'input';

    #$inputs;

    constructor(options) {
        super(options);
        this.options = options;
        this.$table = this.init();
        this.#$inputs = this.$table.find(TodoFormView.INPUT_SELECTOR);
    }

    onFormSubmit(e) {
        e.preventDefault();

        const data = this.getTodo();

        this.options.onSubmit(data);
    }

    getTodo() {
        const data = {};

        for (const input of this.#$inputs) {
            data[input.id] = input.value;
        }

        return data;
    }

    fillForm(data) {
        for (const input of this.#$inputs) {
            if (data[input.id]) {
                input.value = data[input.id];
            }
        }
    }

    clear() {
        this.#$inputs.val('');
    }
}