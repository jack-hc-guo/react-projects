let d = new Date();
let name = prompt("What's your name?");

// alert("Today's date is "+d+");
document.body.innerHTML = "<h2>Today's date is "+d+"</h2>";

let p = document.createElement("P");
let t = document.createTextNode("Hello "+name);
p.appendChild(t)
document.body.appendChild(p);
