class Student {
    constructor(_id, first_name, last_name, student_id, carreer) {
        this._id = _id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.student_id = student_id;
        this.carreer = carreer;
    }

    getStudent() {
        return JSON.stringify(this);
    }
};