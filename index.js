let listContainer = document.querySelector("[data-lists]");
const newListForm = document.querySelector("[data-new-list-form]");
const newListInput = document.querySelector("[data-new-list-input]");
const deleteListButton = document.querySelector("[data-delete-list-button]");

//local storage is key value pair so makin keys to store our values to those keys
const LOCAL_STORAGE_LIST_KEY = "task.lists"; //LOCAL_STORAGE_LIST_KEY is our key to store the list
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId";
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);


listContainer.addEventListener('click' , e=>{
    if(e.target.tagName.toLowerCase() === 'li'){
        selectedListId = e.target.dataset.listId
        saveAndRender();
    }
})

deleteListButton.addEventListener('click', e =>{
lists = lists.filter(list => list.id !== selectedListId)
selectedListId = null
saveAndRender();

})

//populating the lists array by function creatList
//by taking the input from new list form
newListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const listName = newListInput.value;
  if (listName == null || listName === "") return;
  const list = createList(listName);
  newListInput.value = null;
  lists.push(list);
  saveAndRender();
});

function createList(name) {
  return {
    id: Date.now().toString(),
    taskList: name,
    tasks: [],
  };
}

function saveAndRender() {
  save();
  render();
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY , selectedListId)
}

//rendering the list to show the lists that are made
function render() {
  clearElement(listContainer);
  lists.forEach((list) => {
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id; //to get the id of the element
    listElement.classList.add("list-name");
    listElement.innerText = list.taskList;
    if (list.id === selectedListId) {
      listElement.classList.add("active-list");
    }
    listContainer.appendChild(listElement);
  });
}

//clearing the previous list before rendering to make sure the removed lists does not shows
function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

render();
