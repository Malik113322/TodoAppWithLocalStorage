const func = () => {
  let displayCreateNote = document.getElementById("create-note");
  displayCreateNote.style.display = "none";

  // nav-button display create-container
  let navBtn = document.getElementById("nav-button");
  navBtn.addEventListener("click", () => {
    displayCreateNote.style.display = "block";
    displayCreateNote.style.display = "flex";
  });

  // create and push note in localStorage and array
  let allNotes;

  let data = localStorage.getItem("note");
  if (data === null) {
    allNotes = [];
  } else {
    allNotes = JSON.parse(data);
  }

  let title = document.getElementById("title");
  let desc = document.getElementById("desc");

  let saveBtn = document.getElementById("save-button");

  saveBtn.addEventListener("click", () => {
    let note = {
      title: title.value,
      description: desc.value,
    };

    if (saveBtn.innerText === "UPDATE") {
      let editCard = document.querySelector(".card-container");
      let cardIndex = editCard.getAttribute("editCard");
      allNotes[cardIndex] = note;

    } else {
      allNotes.push(note);
      
    }
    localStorage.setItem("note", JSON.stringify(allNotes));
      window.location.reload();
  });

  // display data
  allNotes.forEach((item, index) => {
    showAllnotes = `<div class="card-container">
    <h2> ${item.title} </h2>
    <h3> ${item.description} </h3>
    <div class="button-icons">
    
    <button onclick="removeItem(${index})">  
    <i class="fa-regular fa-trash-can"></i>
    </button>
    
    <button onclick="editItem(${index})"> <i class="fa-regular fa-pen-to-square"> </i></button>
    </div>
</div>


  
    </div>`;

    let notesContainer = document.getElementById("notes-container");
    notesContainer.innerHTML = notesContainer.innerHTML + showAllnotes;

    // reomve item from array and localStorage
  });
};

func();

let removeItem = (noteIndex) => {
  let allNotes = [];
  let data = localStorage.getItem("note");
  if (data) {
    allNotes = JSON.parse(data);
  }
  allNotes.splice(noteIndex, 1);
  localStorage.setItem("note", JSON.stringify(allNotes));
  window.location.reload();
};

// search words title+description description

let search = document.getElementById("search-button");

search.addEventListener("input", () => {
  let searchValue = search.value.toLowerCase();

  let cardContainer = document.getElementsByClassName("card-container");
  Array.from(cardContainer).forEach((ele) => {
    let noteTitleText = ele.getElementsByTagName("h2")[0].innerHTML;
    let noteDescriptionText = ele.getElementsByTagName("h3")[0].innerHTML;
    let data = noteTitleText + noteDescriptionText;

    if (data.includes(searchValue)) {
      ele.style.display = "block";
      ele.style.display = "flex";
    } else {
      ele.style.display = "none";
    }
  });
});

// edit note

const editItem = (noteIndex) => {
  let displayCreateNote = document.getElementById("create-note");
  displayCreateNote.style.display = "block";
  displayCreateNote.style.display = "flex";

  let allNotes = [];
  let data = localStorage.getItem("note");
  allNotes = JSON.parse(data);

  let title = document.getElementById("title");
  let desc = document.getElementById("desc");

  title.value = allNotes[noteIndex].title;
  desc.value = allNotes[noteIndex].description;

  let saveBtn = document.getElementById("save-button");
  saveBtn.innerText = "UPDATE";

  let editCard = document.querySelector(".card-container");
  editCard.setAttribute("editCard", noteIndex);
};
