let hide = document.getElementById('hide');
for (let e of document.getElementsByClassName("select")) {
    e.innerHTML = "<option>A</option>\n" +
        "        <option>B</option>\n" +
        "        <option>C</option>\n" +
        "        <option>D</option>\n" +
        "        <option>E</option>"
}

for (let e of document.getElementsByClassName("r")) {
    e.addEventListener("change", function() {
        let num = e.id[1];
        let cA = document.getElementById("c"+num+"a")
        let cB = document.getElementById("c"+num+"b")
        if (e.checked) {
            cA.type="radio"
            cB.type="radio"
        } else {
            cA.type="checkbox"
            cB.type="checkbox"
        }
    })
}



class Timeslot{
    times=[]
    constructor(times){
        this.times=times;
    }
}
const timeslots = {
    "A":new Timeslot(["11", "12", "43", "44"]),
    "B":new Timeslot(["13", "14", "31", "32"]),
    "C":new Timeslot(["21", "22", "53", "54"]),
    "D":new Timeslot(["33", "34", "51", "52"]),
    "E":new Timeslot(["23", "24", "41", "42"])
}
class Course{
    name=""
    timeslot1=null
    timeslot2=null
    color=null

    constructor(name, one, two, color) {
        this.name = name;
        this.timeslot1 = one;
        this.timeslot2 = two;
        this.color = color;
    }

}
let times = {}
for (let i =1; i<6; i++){
    for (let j=1; j<5; j++){
        times[(i).toString()+(j).toString()] = [];
    }
}
console.log(times);
const colors = ["#40de6b", "#436bd9", "#e6c957", "#50bf6f", "#5b76c2", "#f0d671"]
let courses = []
function save(){
    courses=[]
    for (let i = 1; i<4; i++){
        let nameE = document.getElementById("name"+i);
        let s1E = document.getElementById("s"+i+"a");
        let s2E = document.getElementById("s"+i+"b");
        c = new Course(nameE.value, s1E.value, s2E.value, colors[i-1]);
        courses.push(c);
    }
    console.log(courses);
    for (let e of document.getElementsByClassName("c")) {
        e.checked=false
    }
    hide.style.display="block";
}

for (let e of document.getElementsByClassName("c")) {
    e.addEventListener("change", function() {
        let num = parseInt(e.id[1]);
        let second = e.id[2]=="b";
        let timeslot = timeslots[second?courses[num-1].timeslot2:courses[num-1].timeslot1];
        let selected = e.checked;
        console.log(num, second, timeslot, selected);
        if (selected) {
            for (let i = 0; i<4; i++){
                addTimeslot(timeslot.times[i], num, second);
            }
        } else {
            for (let i = 0; i<4; i++){
                removeTimeslot(timeslot.times[i], num, second);
            }
        }
    })
}

function renderAll(){

}

function renderTimeslot(ts, second){
    let time = times[ts]
    let tsE = document.getElementById(ts);
    if (tsE==null) return;
    tsE.innerHTML=""
    for (let i = 0; i<time.length; i++){
        let courseNum = time[i]
        let course = courses[courseNum-1];

        let e = document.createElement("div");
        e.style.gridColumn=(i+1).toString();
        e.innerHTML = course.name;
        e.style.backgroundColor=colors[courseNum-1+(second?3:0)];
        tsE.appendChild(e);
    }
}

function addTimeslot(ts,course, second){
    if (times[ts].includes(course)) return;
    times[ts].push(course);
    renderTimeslot(ts, second);
}
function removeTimeslot(ts, course, second){
    let list = times[ts]
    let ol=[]
    for (let i = 0; i < list.length; i++) {
        if (list[i]==course){
            continue
        }
        ol.push(list[i]);
    }
    times[ts]=ol;
    renderTimeslot(ts, second);
}
function resetTimeslot(ts){
    times[ts]=[]
    renderTimeslot(ts);
}