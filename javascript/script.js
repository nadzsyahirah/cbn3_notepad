function load_text() {
      	document.getElementById("noteContent").value;
    	}

		// Font type
		function changeFont(font) {
			document.getElementById("noteContent").style.fontFamily = font.value;
		}

		// Font Size
		function changeSize(size) {
			var fs = document.getElementById("noteContent");
			fs.style.fontSize = size.value + 'px';
		}

		// Style Bold
		function bold_click() {
			var bold = document.getElementById("noteContent").style.fontWeight;
			if (bold !== 'bold'){
				document.getElementById("noteContent").style.fontWeight = 'bold';
			}
			else
			{
				document.getElementById("noteContent").style.fontWeight = 'normal';
			}
		}

		// Style Italic
		function italic_click() {
			var italic = document.getElementById("noteContent").style.fontStyle;
			if (italic !== 'italic'){
				document.getElementById("noteContent").style.fontStyle = 'italic';
			}
			else
			{
				document.getElementById("noteContent").style.fontStyle = 'normal';
			}
		}

		// Style Underline
		function underline_click() {
			var uline = document.getElementById("noteContent").style.textDecoration;
			if (uline !== 'underline'){
				document.getElementById("noteContent").style.textDecoration = 'underline';
			}
			else
			{
				document.getElementById("noteContent").style.textDecoration = 'none';
			}
		}

		// Style Normal
		function normal_click() {
			document.getElementById("noteContent").style.fontStyle = "normal";
			document.getElementById("noteContent").style.textDecoration = "none";
			document.getElementById("noteContent").style.fontWeight = "normal";
			}

		// Clear
		function clear_click() {
			document.getElementById("noteContent").value="";
		}

		// Note List
		const noteListDiv = document.querySelector(".noteList");
		let noteID = 1;
		function Note(id, title, content) {
			this.id = id;
			this.title = title;
			this.content = content;
		}

		// Save / add event listeners
		function eventListeners() {
			document.getElementById("saveNote").addEventListener("click", saveNewNote);
			document.addEventListener("DOMContentLoaded", displayNotes);
			noteListDiv.addEventListener("click", deleteNote);
		}
		eventListeners();

		// Local storage, get item
		function getDataFromStorage() {
			return localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
		}

		//Add new note /save
		function saveNewNote() {
			const noteTitle = document.getElementById("noteTitle");
			const noteContent = document.getElementById("noteContent");

			if (validateInput(noteTitle, noteContent)) {
				let notes = getDataFromStorage();
				let noteItem = new Note(noteID, noteTitle.value, noteContent.value);
				noteID++;
				notes.push(noteItem);
				createNote(noteItem);

				// Save to local storage
				localStorage.setItem("notes", JSON.stringify(notes));
				noteTitle.value = "";
				noteContent.value = "";
			}
		}

		// Validate input
		function validateInput(title, content) {
			if (title.value !== "" && content.value !== "") {
				return true;
			} else {
				if (title.value === "") {title.classList.add("warning");}
				if (content.value === "") {content.classList.add("warning");}
			}
			setTimeout(() => {
				title.classList.remove("warning");
				content.classList.remove("warning");
			}, 1600);			
		}

		// Create new note div
		function createNote(noteItem) {
			const div = document.createElement("div");
			div.classList.add("noteItem");
			div.setAttribute("dataID", noteItem.id);
			div.innerHTML = `
			<h3>${noteItem.title}</h3>
			<p>${noteItem.content}</p>
			<button id="deleteNote" class="btndel" type="button">Delete</button>
			`;
			noteListDiv.appendChild(div);
		}

		// Display all notes from local storage
		function displayNotes() {
			let notes = getDataFromStorage();
			if (notes.length > 0) {
				noteID = notes[notes.length - 1].id;
				noteID++;
			} else {
				noteID = 1;
			}
			notes.forEach(item => {
				createNote(item);
			});
		}

		// Delete note
		function deleteNote(e) {
			if (e.target.classList.contains("btndel")) {
				// Remove from DOM
				e.target.parentElement.remove();
				let divID = e.target.parentElement.dataset.id;
				let notes = getDataFromStorage();
				let newNotesList = notes.filter(item => {
					return item.id !== parseInt(divID);
				});
				localStorage.setItem("notes", JSON.stringify(newNotesList));
			}
		}