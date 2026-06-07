let exams=[];
function addExam() {

    let subject =
        document.getElementById("subject").value;

    let examDate =
        document.getElementById("examDate").value;

    if(subject=== ""|| examDate===""){
        alert("Please fill all Details.");
        return;
    }    

    let today = new Date();

    let exam = new Date(examDate);

    let difference = exam - today;

    let daysLeft = Math.ceil(
        difference / (1000 * 60 * 60 * 24)
    );

    
    exams.push({
        subject: subject,
        examDate: examDate,
        daysLeft: daysLeft,
        completed:false
    });
    console.log(exams);

    localStorage.setItem(
        "examDate",
        JSON.stringify(exams)
    );    
    let list=document.getElementById("examList");


    list.innerHTML +=
        `<li>
        <strong>${subject}</strong>
        🗓️${examDate}<br>
        ⌛${daysLeft} days left<br>
        <button
        onclick="this.parentElement.classList.toggle('completed')">
        complete</button>
        <button onclick="this.parentElement.remove()">
        Delete</button>
        </li>`;

    document.getElementById("subject").value = "";
    document.getElementById("examDate").value= "";

}

window.onload=function(){
    renderExams();
};
function renderExams() {

    let list = document.getElementById("examList");
    list.innerHTML = "";

    let exams = JSON.parse(localStorage.getItem("examDate")) || [];

    exams.forEach(item => {
        list.innerHTML += `
        <li class="exam-item ${item.completed ?'completed':""}">
        <div class="info">
        <strong>${item.subject}</strong><br>
        🗓️ ${item.examDate}<br>
        ⌛ ${item.daysLeft} days left<br>
        </div>
        <div class="buttons">
        <button onclick="toggleComplete('${item.subject}')">
        Complete</button>

        <button onclick="removeExam('${item.subject}')">
        Delete</button>
        </div>

        </li>`;
    });
}
function removeExam(subject) {

    let exams = JSON.parse(localStorage.getItem("examDate")) || [];

    exams = exams.filter(item => item.subject !== subject);

    localStorage.setItem("examDate", JSON.stringify(exams));

    renderExams();
}
function toggleComplete(subject) {

    let exams = JSON.parse(localStorage.getItem("examDate")) || [];

    exams = exams.map(item => {
        if (item.subject === subject) {
            item.completed = !item.completed;
        }
        return item;
    });

    localStorage.setItem("examDate", JSON.stringify(exams));

    renderExams();
}