let isUpdate = false
let contactObj = {}

window.addEventListener("DOMContentLoaded", (event) => {
  //validate first name
  const name = document.querySelector("#name");
  const nameError = document.querySelector(".name-error");
  name.addEventListener("input", function () {
    if (name.value.length == 0) {
      nameError.textContent = "";
      return;
    }
    try {
      new Contact().name = name.value;
      nameError.textContent = "";
    } catch (error) {
      nameError.textContent = error;
    }
  });

  //validation for phone number
  const phoneNumber = document.querySelector("#phoneNumber");
  const numberError = document.querySelector(".tel-error");
  phoneNumber.addEventListener("input", function () {
    if (phoneNumber.value.length == 0) {
      numberError.textContent = "";
      return;
    }
    try {
      new Contact().phoneNumber = phoneNumber.value;
      numberError.textContent = "";
    } catch (error) {
      numberError.textContent = error;
    }
  });

  //validation for zip code
  const zip = document.querySelector("#zip");
  const zipError = document.querySelector(".zip-error");
  zip.addEventListener("input", function () {
    if (zip.value.length == 0) {
      zipError.textContent = "";
      return;
    }
    try {
      new Contact().zip = zip.value;
      zipError.textContent = "";
    } catch (error) {
      zipError.textContent = error;
    }
  });

  checkForUpdate();
  localStorage.removeItem('contactEdit')
});

function save() {
  try {
    setContactObject()
    createAndUpdateStorage()
    resetForm()
    window.location.replace("../pages/AddressBookHome.html")
  } catch (error) {
    alert(error);
  }
}

function setContactObject() {
  try {
    contactObj._name = getInputValueById("#name");
  } catch (error) {
    setTextValue(".name-error", error);
    throw error;
  }

  try {
    contactObj._phoneNumber = getInputValueById("#phoneNumber");
  } catch (error) {
    setTextValue(".tel-error", error);
    throw error
  }
  contactObj._address = getInputValueById("#address");
  contactObj._city = getInputValueById("#city");
  contactObj._state = getInputValueById("#state");
  try {
    contactObj._zip = getInputValueById("#zip");
  } catch (error) {
    setTextValue(".zip-error", error);
    throw error
  }
}

const getInputValueById = (id) => {
  let value = document.querySelector(id).value;
  return value;
};

function setTextValue(component, problem) {
  let textError = document.querySelector(component);
  textError.textContent = problem;
}

function resetForm() {
  setValue("#name", "");
  setValue("#phoneNumber", "");
  setValue("#address", "");
  setValue("#city", "Select City");
  setValue("#state", "Select State");
  setValue("#zip", "");
}

function setValue(id, value) {
  const element = document.querySelector(id);
  element.value = value;
}

function createAndUpdateStorage() {
  let contactList = JSON.parse(localStorage.getItem("AddressBook"))
  if (contactList != undefined) {
    let contactData = contactList.find(empData => empData._id == contactObj._id)
    if(!contactData){
      contactList.push(createContactData())
    }else{
      const index = contactList.map(empData => empData._id).indexOf(contactData._id)
      contactList.splice(index,1,createContactData(contactData._id))
    }
  } else {
    contactList = [createContactData()]
  }
  alert(contactList.toString())
  localStorage.setItem("AddressBook",JSON.stringify(contactList))
}

function createContactData(id) {
  let contact = new Contact()
  if (!id) {
    contact._id = new Date().getTime()
  }
  else{
    contact._id = id
  }
  setContactData(contact)
  return contact
}

function setContactData(contact) {
  try {
    contact.name = getInputValueById("#name");
  } catch (error) {
    setTextValue(".name-error", error);
    throw error;
  }

  try {
    contact.phoneNumber = getInputValueById("#phoneNumber");
  } catch (error) {
    setTextValue(".tel-error", error);
    throw error
  }
  contact.address = getInputValueById("#address");
  let city = getInputValueById("#city");
  if (city != "Select City") {
    contact.city = city;
  } else {
    throw "Please select city"
  }
  let state = getInputValueById("#state");
  if (state != "Select State") {
    contact.state = state;
  } else {
    throw "Please select state"
  }

  try {
    contact.zip = getInputValueById("#zip");
  } catch (error) {
    setTextValue(".zip-error", error);
    throw error
  }

  alert(contact.toString());
  return contact;
}

  //functions required for updates
function checkForUpdate(){
  const contactJson = localStorage.getItem('contactEdit')
  isUpdate = contactJson ? true : false;
  if(!isUpdate){
    return
  }
  contactObj = JSON.parse(contactJson)
  setForm()
}

function setForm() {
  setValue("#name",contactObj._name)
  setValue("#phoneNumber", contactObj._phoneNumber);
  setValue("#address", contactObj._address);
  setValue("#city", contactObj._city);
  setValue("#state", contactObj._state);
  setValue("#zip", contactObj._zip);
}

function setSelectedValue(propertyValue,value){
  let allItems = document.querySelectorAll
  (propertyValue)
  allItems.forEach(item =>{
    if(Array.isArray(value)){
      if(value.includes(item.value)){
        item.checked = true
      }
    }
    else if (item.value == value){
      item.checked = true
    }
  })
}