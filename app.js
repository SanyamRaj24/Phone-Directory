showContacts();
let addBtn = document.getElementById("addBtn");
let addName = document.getElementById("floatingInput");
let addNum = document.getElementById("floatingTel");
addBtn.addEventListener('click', function (e) {
    if (addName.value == "" || addNum.value == "" || addNum.value.length != 10 || isNaN(addNum.value) || Number.isInteger(Number(addNum.value)) == false) {
        alert(`You haven't added the contact properly.`)
    }
    else {
        let name = localStorage.getItem("name");
        let telno = localStorage.getItem("telno");
        if (name == null || telno == null) {
            nameObj = [];
            numbObj = [];
        }
        else {
            nameObj = JSON.parse(name);
            numbObj = JSON.parse(telno);
        }
        nameObj.push(addName.value);
        numbObj.push(addNum.value);
        localStorage.setItem("name", JSON.stringify(nameObj));
        localStorage.setItem("telno", JSON.stringify(numbObj));
        addName.value = "";
        addNum.value = "";
        showContacts();
    }
})
function showContacts() {
    let name = localStorage.getItem("name");
    let telno = localStorage.getItem("telno");
    if (name == null || telno == null) {
        nameObj = [];
        numbObj = [];
    }
    else {
        nameObj = JSON.parse(name);
        numbObj = JSON.parse(telno);
    }
    newNameObj=[]
    newNameObj=newNameObj.concat(nameObj);
    sorted = newNameObj.sort((a, b) => {
        return a.localeCompare(b, undefined, { sensitivity: 'base' });
    });
    let html = "";
    nameObj.forEach(function (element, index) {
        html += `
        <div class="contactCard my-2 mx-2" style="max-width: 20rem; border: 3px solid lightgray;border-radius: 8px; padding:5px ;">
        <div class="card">
  <ul id="det" class=" conDetails list-group list-group-flush">
    <li id="conName${nameObj.indexOf(sorted[index])}" class="list-group-item">${sorted[index]}</li>
    <li id="conNum${nameObj.indexOf(sorted[index])}" class="list-group-item">${numbObj[nameObj.indexOf(sorted[index])]}</li>
  </ul>
</div>
        <div style="width : 35%; margin : 0.5rem auto;">
            <button id="edit${nameObj.indexOf(sorted[index])}" type="button" onclick="editContact(this.id)" class=" btn btn-outline-primary">Edit</button>
            <button id="${nameObj.indexOf(sorted[index])}" type="button" onclick="deleteContact(this.id)" class="btn btn-outline-primary" >-</button>
        </div>
    </div>`
    })
    let cdetail = document.getElementById("details");
    if (nameObj.length != 0) {
        cdetail.innerHTML = html;
    }
    else {
        cdetail.innerHTML = `<h5>Zero Contacts</h5>`;
    }
}
function deleteContact(index) {
    let name = localStorage.getItem("name");
    let telno = localStorage.getItem("telno");
    if (name == null || telno == null) {
        nameObj = [];
        numbObj = [];
    }
    else {
        nameObj = JSON.parse(name);
        numbObj = JSON.parse(telno);
    }
    nameObj.splice(index, 1);
    numbObj.splice(index, 1);
    localStorage.setItem("name", JSON.stringify(nameObj));
    localStorage.setItem("telno", JSON.stringify(numbObj));
    showContacts();
}
function editContact(i) {
    let ind = Number(i.slice(4,));
    document.getElementById(i).innerText = "Done";
    document.getElementById(`conName${ind}`).setAttribute('contenteditable', true);
    document.getElementById(`conNum${ind}`).setAttribute('contenteditable', true);
    let name = localStorage.getItem("name");
    let telno = localStorage.getItem("telno");
    if (name == null || telno == null) {
        nameObj = [];
        numbObj = [];
    }
    else {
        nameObj = JSON.parse(name);
        numbObj = JSON.parse(telno);
    }
    let editName = document.getElementById(`conName${ind}`);
    let editNum = document.getElementById(`conNum${ind}`);
    let editbtn = document.getElementById(i);
    editbtn.addEventListener('click', function (e) {
        e.stopImmediatePropagation();
        if (editName.innerText == "" || editNum.innerText == "" || editNum.innerText.length != 10 || isNaN(editNum.innerText) || Number.isInteger(Number(editNum.innerText)) == false) {
            alert(`You haven't edited the contact properly.`);
        }
        else {
            nameObj[ind] = editName.innerText;
            numbObj[ind] = editNum.innerText;
            localStorage.setItem("name", JSON.stringify(nameObj));
            localStorage.setItem("telno", JSON.stringify(numbObj));
            document.getElementById(`conName${ind}`).setAttribute('contenteditable', true);
            document.getElementById(`conNum${ind}`).setAttribute('contenteditable', true);
            document.getElementById(i).innerText = "Edit";
            showContacts();
        }
    })
}
let search = document.getElementById("searchNum");
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    let contactCard = document.getElementsByClassName("contactCard");
    Array.from(contactCard).forEach(function (element) {
        let contactText = element.getElementsByTagName("ul")[0].innerText;
        if (contactText.toLowerCase().includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})
