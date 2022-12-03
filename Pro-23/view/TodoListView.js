class TodoListView extends View {
    static LIST_SELECTOR = '#container';
    static SELECTOR_EDIT_BTN = '.edit';
    static SELECTOR_DELETE_BTN = '.delete';
    static TODO_SELECTOR = '.todo';

    #$todoListContainer;

    constructor(options) {
        super(options);
        this.options = options;
        this.$table = this.init();
        this.#$todoListContainer = this.$table.find(TodoListView.LIST_SELECTOR);
    }

    init() {
        return $(`
            <table>
                <tbody id="container"></tbody>
            </table>
        `)
            .on('click', TodoListView.SELECTOR_EDIT_BTN, e => this.onEditClick(e))
            .on('click', TodoListView.SELECTOR_DELETE_BTN, e => this.onDeleteClick(e));
    }

    renderTodo(todo) {
        this.#$todoListContainer.append(this.getTemplate(todo));
    }

    onEditClick(e) {
        const id = this.getElementById(e.target)

        this.options.onEdit(id);
    }

    removeItem(id) {
        const $todo = this.#$todoListContainer.find(`[data-id="${id}"]`)

        $todo.remove();
    }

    onDeleteClick(e) {
        const id = this.getElementById(e.target)

        this.options.onDelete(id);
    }

    renderList(todoList) {
        this.#$todoListContainer.html(todoList.map(this.getTemplate));
    }

    replaceItem(id, todo) {
        const $oldTodoItem = $(`[data-id="${id}"]`);
        const newTodoItem = this.getTemplate(todo);

        $oldTodoItem.replaceWith(newTodoItem);
    }

    getElementById(el) {
        return el.closest(TodoListView.TODO_SELECTOR).dataset.id;
    }

    getTemplate({ id, title }) {
        return `
            <tr class="todo" data-id="${id}">
                <td>${title}</td>
                <td>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </td>
            </tr>
        `
    }
}