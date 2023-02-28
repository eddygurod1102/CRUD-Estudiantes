const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const studentId = document.getElementById("student_id");
const carreer = document.getElementById("carreer");

const sendButton = document.getElementById("send");

const sendData = async() => {
    const student = {
        name: {
            first: firstName.value,
            last: lastName.value,
        },
        student_id: studentId.value,
        carreer: carreer.value,
    }

    const res = await fetch("http://localhost:8080/students", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
    });

    console.log(JSON.stringify(student));
};

sendButton.addEventListener("click", sendData);