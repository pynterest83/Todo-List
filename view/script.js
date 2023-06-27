const inputTitle = document.getElementById("title");
const inputDescription = document.getElementById("description");
const listNotes = document.getElementById("list-container");
const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", addTask);
inputTitle.addEventListener("keypress", function(event) {
	if (event.key == "Enter") {
		addTask();
	}
});
function addTask(){
	if (inputTitle.value === ''){
		alert("Please enter a task");
	}
	else {
		const li = document.createElement("li");

		const content = document.createElement("content");
		content.innerText = inputTitle.value + '\n' + inputDescription.value;
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
		
		inputTitle.value = "";
		inputDescription.value = "";

		edit.addEventListener("click", (e) => {
			if (edit.innerHTML == "\u270E") {
				edit.innerHTML = "\u2713";
				content.contentEditable = true;
			}
			else {
				edit.innerHTML = "\u270E";
				content.contentEditable = false;
			}
		});

		remove.addEventListener("click", (e) => {
			e.target.parentElement.parentElement.remove();
		});

		li.addEventListener("click", (e) => {
			e.target.classList.toggle("checked");
		});
	}
}