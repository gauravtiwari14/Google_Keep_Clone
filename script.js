const addButton = document.querySelector('#add')

const updateLSDate = () => {
  const textAreaData = document.querySelectorAll("textarea")
  const notes = [];

  textAreaData.forEach((elem) => {
    return notes.push(elem.value);
  })

   localStorage.setItem('notes', JSON.stringify(notes))

}

const addNewNote = (text = "") => {
    const note = document.createElement('div')
    note.classList.add("note")
    const htmlContent = `
     <div class="operation">
           <button class="edit"> <i class="fas fa-edit"></i></button>
           <button class="delete"> <i class="fas fa-trash-alt"></i></button>
     </div>

     <div class="main ${text ? "" : "hidden"}"></div>
     <textarea class="${text ? "hidden" : ""}"></textarea>`

     note.insertAdjacentHTML("afterbegin",htmlContent);

     const editButton = note.querySelector(".edit")
     const delButton = note.querySelector(".delete")
     const maindiv = note.querySelector(".main")
     const textArea = note.querySelector("textarea")

    //  editing the note 
    textArea.value = text;
    maindiv.innerHTML = text;

    const editNote = () => {
     maindiv.classList.toggle("hidden")
     textArea.classList.toggle("hidden")
    }

    editButton.addEventListener("click",editNote)

    const fixedToMainDiv = (e) => {
      const value = e.target.value;
      maindiv.innerHTML = value;

      updateLSDate();
    }

    textArea.addEventListener("change",fixedToMainDiv)


    //  deleting the note 
     const delNote = () => {
        note.remove()
        updateLSDate();

     }

     delButton.addEventListener("click",delNote)

     document.body.appendChild(note)


}

const notes = JSON.parse(localStorage.getItem('notes'))
if (notes){
  notes.forEach((note) => 
    addNewNote(note))
}

addButton.addEventListener("click",addNewNote)