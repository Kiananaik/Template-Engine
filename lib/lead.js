class employee{
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
    }
    name() {
        return this.name;
    }
    id() {
        return this.id;
    }
    email() {
        return this.email;
    }
    title() {
        return "employee"
    }
}
module.exports = employee