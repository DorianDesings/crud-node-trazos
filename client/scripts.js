const formCreateElement = document.getElementById('form-create');
const formEditElement = document.getElementById('form-edit');
const usersElement = document.getElementById('users');

let currentUserId;

const fetchData = async (url, ...options) => {
  console.log(url);
  const request = await fetch(url, ...options);
  const data = await request.json();
  console.log(data);
  return data;
};

const printUsers = users => {
  usersElement.innerHTML = '';
  const fragment = document.createDocumentFragment();
  users.forEach(user => {
    const userContainer = document.createElement('div');
    const name = document.createElement('h2');
    name.textContent = user.name;
    userContainer.append(name);
    const detailsButton = document.createElement('button');
    detailsButton.dataset.type = 'details';
    userContainer.append(detailsButton);
    detailsButton.textContent = 'DETAILS';
    const editButton = document.createElement('button');
    editButton.dataset.type = 'edit';
    editButton.dataset.id = user.userId;
    editButton.dataset.name = user.name;
    editButton.dataset.email = user.email;
    editButton.textContent = 'EDIT';
    userContainer.append(editButton);
    const deleteButton = document.createElement('button');
    deleteButton.dataset.type = 'delete';
    deleteButton.dataset.id = user.userId;
    deleteButton.textContent = 'DELETE';
    userContainer.append(deleteButton);

    fragment.append(userContainer);
  });

  usersElement.append(fragment);
};

const getAllUsers = async () => {
  const allUsers = await fetchData('http://127.0.0.1:3000/api/users');
  printUsers(allUsers);
};

const handleCreateUser = e => {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;

  const data = { name: name, email: email };

  fetchData('http://127.0.0.1:3000/api/users', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
};

const handleEditUser = e => {
  e.preventDefault();

  if (!currentUserId) return;

  const name = e.target.name.value;
  const email = e.target.email.value;

  const data = { name: name, email: email };

  fetchData(`http://127.0.0.1:3000/api/users/${currentUserId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
};

const fillDataFormEdit = data => {
  const { id, name, email } = data;

  currentUserId = id;
  console.log(currentUserId);

  formEditElement.name.value = name;
  formEditElement.email.value = email;
};

const showUserDetails = id => {};

const deleteUser = async id => {
  currentUserId = id;

  if (!currentUserId) return;

  fetchData(`http://127.0.0.1:3000/api/users/${currentUserId}`, {
    method: 'DELETE'
  });

  location.reload();
};

getAllUsers();

formCreateElement.addEventListener('submit', handleCreateUser);
formEditElement.addEventListener('submit', handleEditUser);
window.addEventListener('click', e => {
  const type = e.target.dataset.type;
  switch (type) {
    case 'details':
      showUserDetails(e.target.dataset.id);
      break;
    case 'edit':
      fillDataFormEdit(e.target.dataset);
      break;
    case 'delete':
      deleteUser(e.target.dataset.id);
      break;
  }
});
