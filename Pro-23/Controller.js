class Controller {
    #$rootEl;

    constructor($rootEl) {
        this.#$rootEl = $rootEl;
        this.collection = new Collection();
        this.formView = new TodoFormView({
            onSubmit: todo => {
                if (this.validTodo(todo)) {
                    return
                }

                this.saveTodo(todo)
            },
        });
        this.listView = new TodoListView({
            onEdit: (id) => {
                this.editTodo(id)
            },
            onDelete: (id) => {
                this.deleteTodo(id)
            },
        });

        this.formView.appendTo(this.#$rootEl);
        this.listView.appendTo(this.#$rootEl);

        this.collection.fetch().then((list) => {
            this.listView.renderList(list);
        })
    }

    saveTodo(todo) {
        if (todo.id) {
            this.collection.update(todo.id, todo)
                .then(() => {
                    this.listView.replaceItem(todo.id, todo);
                })
                .catch(this.showError);
        } else {
            this.collection.create(todo)
                .then((newTodo) => {
                    this.listView.renderTodo(newTodo);
                })
                .catch(this.showError)
        }

        this.formView.clear();
    }

    validTodo(el) {
        if (el.title.trim() === '') {
            this.showError({ message: 'поле ввода не должно быть пустым' })
            return true
        }
    }

    editTodo(id) {
        const todo = this.collection.getElById(id);

        this.formView.fillForm(todo);
    }

    deleteTodo(id) {
        this.listView.removeItem(id);
        this.collection.delete(id);
    }

    showError(err) {
        alert(err.message);
    }
}