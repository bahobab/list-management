

// const {getUsers, addNewUser, deleteUser} = require('./users')

// ####################### constants ###############################

const API_URL = 'https://jsonplaceholder.typicode.com/users';
const ROBOHASH_URL = 'https://robohash.org/';

const DEFFAULT_SORT_FIELD = 'name'
const DEFFAULT_FILTER_BY = 'all'
const DEFFAULT_DISPLAY_FORMAT = 'card'

let filterBy= DEFFAULT_FILTER_BY
let sortBy = DEFFAULT_SORT_FIELD
let displayFormat = DEFFAULT_DISPLAY_FORMAT

let validFields

// ################################################################################
// You may copy the allUsers array from the users.js file here 
// then comment the API call in line 29 bellow
// 
// let allUsers = []
// 
// ################################################################################

document.addEventListener("DOMContentLoaded", async () => {
  allUsers = await getAllUsers()
  buildUserList(displayFormat, sortBy, filterBy)
});

// fetch users from API endpoint
async function getAllUsers() {
  const response = await fetch(API_URL);
  data = await response.json();
  return data;
}

function addNewUser(user) {
  const newUser = document.querySelector('#new-user')

}

const userAction = document.querySelector("#user-action");

const usersList = document.querySelector("#users-list");
usersList.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'gap-4', 'p-4', 'mt-8')

usersList.addEventListener("click", (event) => {
  if (event.target.dataset.action === 'deleteuser') {
    // delete user end reload list
    const userId = event.target.dataset.userid;
    // console.log('deleting user id', userId);
    deleteUser(userId)
  }
  if (event.target.dataset.action === 'edituser') {
    // edit user - show edit form
    const user = event.target.dataset.user;
    editeUser(JSON.parse(user))
  }
});

// sorting list
const sortByRadio = document.querySelector('#sort-fields');
sortByRadio.addEventListener('click', event => {
  if (event.target.name == 'sort-field') {
    sortBy = event.target.value
    buildUserList(displayFormat, sortBy, filterBy)
  }
})

// fiter list
const selectEl = document.querySelector('#filter-field')
selectEl.addEventListener('click', (event) => {
  filterBy = event.target.value
  buildUserList(displayFormat, sortBy, filterBy)
})

function buildUserList(displayFormat, sortField, filterField) {
  // clear existing contents
  usersList.innerHTML = ''

  const sortedUsers = allUsers.sort((a, b) => {
    if ((a[sortField]).toLowerCase() > (b[sortField]).toLowerCase() ) {
      return -1;
    }
    if ((a[sortField]).toLowerCase() < (b[sortField]).toLowerCase()) {
      return 1;
    }
    return 0;
  })

  if ( filterField !== DEFFAULT_FILTER_BY) {
    return sortedUsers.filter(user => {
      const emailArray = user.email?.split('.')
      const emailDomain = emailArray[emailArray.length - 1]
      // console.log('eamil domain', emailDomain)
      return emailDomain === filterField
    })
    .forEach(user => {
      usersList.appendChild(displayCard(user))
    // displayFormat === 'card'
    //   ? usersList.appendChild(displayCard(user))
      // : usersList.appendChild(displayTable(user))
    })
  }

  return sortedUsers.forEach(user => {
    usersList.appendChild(displayCard(user))
    // displayFormat === 'card'
    //   ? usersList.appendChild(displayCard(user))
    //   : usersList.appendChild(displayTable(user))
  })
}

function displayCard(user) {
  const userStr = JSON.stringify(user)
  const usr = JSON.stringify({a: 1, b: 'w'})
  const cardEl = document.createElement("div");
  cardEl.classList.add('flex', 'flex-col', 'justify-center', 'align-center', 'p-4', 'rounded-tl-lg', 'rounded-br-lg', 'border-2', 'border-gray200', 'bg-white', 'shadow-md', 'hover:shadow-lg', 'relative', 'transition', 'duration-300', 'easein');

  const imgEl = document.createElement('img')
  imgEl.classList.add('pt-0', 'mt-0', 'h-100', 'object-cover')
  imgEl.setAttribute('src', `${ROBOHASH_URL}${user.id}/200x200`)
  imgEl.setAttribute('alt', user.username)

  const infoEl = document.createElement('div')
  infoEl.classList.add('flex', 'flex-col', 'justify-center', 'items-center', 'm-4')

  const nameEl = document.createElement('h2')
  nameEl.textContent = user.name
  const usernameEl = document.createElement('h3')
  usernameEl.textContent = user.username
  const emailEl = document.createElement('h3')
  emailEl.textContent = user.email
  const websiteEl = document.createElement('h3')
  websiteEl.textContent = user.website

  infoEl.appendChild(nameEl)
  infoEl.appendChild(usernameEl)
  infoEl.appendChild(emailEl)
  infoEl.appendChild(websiteEl)

  const actionEl = document.createElement('div')
  actionEl.classList.add('flex', 'flex-col', 'absolute', 'top-0', 'right-0')
  actionEl.setAttribute('id', 'user-action')

  // edit button
  const editEl = document.createElement('span')
  editEl.classList.add('bg-blue-600', 'cursor-pointer')
  editEl.setAttribute('data-user', JSON.stringify(user))
  editEl.setAttribute('data-action', 'edituser')
  editEl.style.backgroundImage='url(./editpencil.png)'
  editEl.style.backgroundPosition = 'center'
  editEl.style.backgroundSize = 'cover'
  editEl.style.width = '25px'
  editEl.style.height = '25px'

  // delete button
  const deleteEl = document.createElement('span')
  deleteEl.classList.add('bg-red-500', 'cursor-pointer', 'mt-1')
  deleteEl.setAttribute('data-userid', user.id)
  deleteEl.setAttribute('data-action', 'deleteuser')
  deleteEl.style.backgroundImage='url(./delete-icon.png)'
  deleteEl.style.backgroundPosition = 'center'
  deleteEl.style.backgroundSize = 'cover'
  deleteEl.style.width = '25px'
  deleteEl.style.height = '25px'

  actionEl.appendChild(editEl)
  actionEl.appendChild(deleteEl)
  
  // card.classList.add("card");
  cardEl.appendChild(imgEl)
  cardEl.appendChild(infoEl)
  cardEl.appendChild(actionEl)
 
  return cardEl;
}

function displayTable(user) {
  const table = document.createElement("tr");
  table.innerHTML = `
    <td>${user.id}</td>
    <td>${user.username}</td>
    <td>${user.email}</td>
  `;
  return table;
}

function deleteUser(id) {
  const confirmDelete = document.querySelector('#confirm-delete')
  confirmDelete.classList.add('transition', 'duration-300', 'ease-linear')
  confirmDelete.style.display = 'flex'
  confirmDelete.style.flexDirection = 'column'
  confirmDelete.style.justifyContent = 'center'
  confirmDelete.style.alignItems = 'center'
  confirmDelete.style.postion = 'absolute'
  confirmDelete.style.transition = 'all .4s ease-in-out'

  const newTop = window.visualViewport.pageTop

  confirmDelete.style.top = `${newTop}px`

  confirmDelete.style.right = '0'
  
  const deleteBtn = document.querySelector('#delete')
  deleteBtn.addEventListener('click', () => {
    // delete user
    allUsers = allUsers.filter(user => user.id.toString() !== id)
    // console.log("delete..", id);
    // console.log(allUsers)

    buildUserList(displayFormat, sortBy, filterBy)

    confirmDelete.style.display = 'none'
  })
  
  const cancelDeleteBtn = document.querySelector('#cancel-delete')
  cancelDeleteBtn.addEventListener('click', () => {
    confirmDelete.style.display = 'none'
  })
  
  return
}

// submit edit
function editeUser(editedUser) {
  // populate edit form elements
  const editPhone = document.querySelector('#edit-telephone')
  editPhone.value = editedUser.phone
  const editWebsite = document.querySelector('#edit-website')
  editWebsite.value = editedUser.website
  const editEmail = document.querySelector('#edit-email')
  editEmail.value = editedUser.email

  const editUser = document.querySelector('#edit-user')

  editUser.style.display = 'flex'
  editUser.style.flexDirection = 'column'
  editUser.style.justifyContent = 'center'
  editUser.style.postion = 'absolute'
  editUser.style.alignItems = 'center'
  
  const newTop = window.visualViewport.pageTop
  
  editUser.style.top = `${newTop}px`
  editUser.style.right = '0'
  
  
  const editForm = document.querySelector('#edit-form')
  // editForm.classList.add('transition', 'duration-300', 'ease-linear')
  editForm.classList.remove('hide-edit-form')
  editForm.style.postion = 'absolute'
  editUser.style.transition = 'all 0.5s ease'
  editForm.style.top = '0'
  
  const editButton = document.querySelector('.edit-button')
  editButton.addEventListener('click', (evt) => {
    evt.preventDefault()

    const inputs = document.querySelectorAll('.edit-user-form input')
    const newUser = {}
    validFields = {}

    inputs.forEach((element) => {
    validateInput(newUser, element)
  })
  const isValid = Object.keys(validFields).every(key => validFields[key] === true)

  if (isValid) {

    editedUser.phone = editPhone.value
    editedUser.website = editWebsite.value
    editedUser.email = editEmail.value

    allUsers = allUsers.map(user => {
      if (user.id === editedUser.id) {
        const updated = {...user, ...editedUser}
        return {...user, ...editedUser}
      }
      return user
    })

    // clearForm(inputs)

    buildUserList(displayFormat, sortBy, filterBy)

    editUser.style.display = 'none'
    }
  })

  const cancelEditBtn = document.querySelector('.cancel-edit')
  cancelEditBtn.addEventListener('click', (evt) => {
    evt.preventDefault()

    editUser.style.display = 'none'
  })
}

// new user
const addUserForm = document.querySelector('#new-user-form')
addUserForm.addEventListener('submit', event => {
  event.preventDefault()
  const inputs = document.querySelectorAll('.new-user-form input')
  const newUser = {}
  validFields = {}

  inputs.forEach((element) => {
    validateInput(newUser, element)
  })

  newUser.name = `${newUser.fname} ${newUser.lname}`
  newUser.username = `${newUser.fname}.${newUser.lname}`
  newUser.id = Math.random().toString(36).substring(2, 9)

  delete newUser.fname
  delete newUser.lname

  const isValid = Object.keys(validFields).every(key => validFields[key] === true)
  if (isValid) {
    allUsers.push(newUser)
    // clear form field
    clearForm(inputs)

    buildUserList(displayFormat, sortBy, filterBy)
  }

})

function clearForm(inputs) {
  inputs.forEach(inputEl => {
    inputEl.value = ''
  })
}

function validateInput(user, el) {
  let isValid = false
  let elName = el.getAttribute('name')
  if (elName === 'email') {
    const errorMsg = el.nextElementSibling
    if (!validateEmail(el.value)) {
      el.style.borderColor = 'red'
      el.classList.remove('hidden')
      errorMsg.classList.remove('hidden')
      validFields[elName] = false
      return
    } else {
      errorMsg.classList.add('hidden')
      el.style.borderColor = 'green'
      validFields[elName] = true
      user[el.name] = el.value
      isFormValid = true
      return
    }
  }
  if (elName === 'website') {
    const errorMsg = el.nextElementSibling
    if (!validateWebsite(el.value)) {
      el.style.borderColor = 'red'
      el.classList.remove('hidden')
      errorMsg.classList.remove('hidden')
      validFields[elName] = false
      return 
    } else {
      errorMsg.classList.add('hidden')
      el.style.borderColor = 'green'
      user[el.name] = el.value
      validFields[elName] = true
      return
    }
  }
  if (elName === 'fname') {
    const errorMsg = el.nextElementSibling
    if (!validateInputString(el.value)) {
      el.style.borderColor = 'red'
      el.classList.remove('hidden')
      errorMsg.classList.remove('hidden')
      validFields[elName] = false
      return
    } else {
      errorMsg.classList.add('hidden')
      el.style.borderColor = 'green'
      validFields[elName] = true
      user[el.name] = el.value
    }
  }  
  if (elName === 'lname') {
    const errorMsg = el.nextElementSibling
    if (!validateInputString(el.value)) {
      el.style.borderColor = 'red'
      el.classList.remove('hidden')
      errorMsg.classList.remove('hidden')
      validFields[elName] = false
      return
    } else {
      errorMsg.classList.add('hidden')
      el.style.borderColor = 'green'
      validFields[elName] = true
      user[el.name] = el.value
    }
  }

  user[el.name] = el.value
}

function validateEmail(email) {
  if (!email) {
    return false
  }
  const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regexp.test(String(email).toLowerCase());
}

function validateInputString (inputStr, min = 3, max = 15) {
  if (!inputStr) {
    return false
  }

  if (inputStr.length < min || inputStr.length > max) {
    return false
  }

  return true
}

function validateWebsite(website) {
  if (!website) {
    return false
  }

  const regExp = /\.[/^\w]/

  return regExp.test(website) 
}

