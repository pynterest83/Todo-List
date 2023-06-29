const inputTitle = document.getElementById("title");
const inputDescription = document.getElementById("description");
const listNotes = document.getElementById("list-container");
const addBtn = document.getElementById("addBtn");
const baseUrl = "http://localhost:3000/api/list/";

window.addEventListener("load", getData);
addBtn.addEventListener("click", postData);
addBtn.addEventListener("click", getData);	

async function postData() {
	if (inputTitle.value === ''){
		alert("Please enter a task");
	}
	const res = await fetch(baseUrl,{
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title: inputTitle.value,
			description: inputDescription.value,
			status: false
		})
	});
	inputTitle.value = "";
	inputDescription.value = "";
}

async function getData() {
	listNotes.innerHTML = "";
	const res = await fetch(baseUrl + 'all', {
	  method: "GET"
	});
	const data = await res.json();
	
	data.forEach((note) => {
		const li = document.createElement("li");

		const content = document.createElement("content");
		if (note.description == undefined) {
			note.description = "";
		}
		if (note.status == true){
			li.classList.add("checked");
		}
		content.innerText = note.title + '\n' + note.description;
		content.contentEditable = false;
		
		const span = document.createElement("SPAN");
		
		const remove = document.createElement("remove");
		remove.innerHTML = "\u00D7";

		const edit = document.createElement("edit");
		edit.innerHTML = "\u270E";
		
		span.appendChild(edit);
		span.appendChild(remove);
		
		li.appendChild(content);
		li.appendChild(span);
		listNotes.appendChild(li);
		
		edit.addEventListener("click", (e) => {
			if (edit.innerHTML == "\u270E") {
				edit.innerHTML = "\u2713";
				content.contentEditable = true;
			}
			else {
				note.title = content.innerText.split('\n')[0];
				note.description = content.innerText.split('\n')[1];
				updateData(note._id, note.title, note.description, note.status);
				edit.innerHTML = "\u270E";
				content.contentEditable = false;
			}
		});

		remove.addEventListener("click", (e) => {
			e.target.parentElement.parentElement.remove();
			deleteData(note._id);
		});

		li.addEventListener("click", (e) => {
			e.target.classList.toggle("checked");
			if (e.target.classList.contains("checked")) {
				note.status = true;
			}
			else {
				note.status = false;
			}
			updateData(note._id, note.title, note.description, note.status);
		});
	});
  }

async function deleteData(id) {
	const res = await fetch(baseUrl + id, {
		method: "DELETE"
	});
}

async function updateData(id, title, description, status) {
	const res = await fetch(baseUrl + id, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title: title,
			description: description,
			status: status
		})
	});
}