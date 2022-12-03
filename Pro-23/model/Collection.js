class Collection {
    #list = [];

    fetch() {
        return TodoApi.getList()
            .then(list => this.#list = list)
    }

    create(todo) {
        return TodoApi.create(todo)
            .then((newTodo) => {
                this.#list.push(newTodo);

                return newTodo;
            });
    }

    update(id, changes) {
        return TodoApi.update(id, changes)
            .then(() => {
                const todo = this.getElById(id);
                Object.keys(changes).forEach(key => todo[key] = changes[key]);

                return todo;
            });
    }

    delete(id) {
        return TodoApi.delete(id).then(() => {
            this.#list = this.#list.filter(todo => todo.id !== id);
        })
    }

    getElById(id) {
        return this.#list.find(todo => todo.id === id);
    }
}