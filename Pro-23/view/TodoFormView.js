class TodoFormView extends FormView {

    init() {
        return $(`
            <form id="form">
                <input id="id" type="hidden"/>
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter to do"/>
                <button>Add to do</button>
            </form>
        `)
            .on('submit', e => this.onFormSubmit(e));
    }
}