const EditUser = ({ setUsers, userToEdit, setUserToEdit, setIsEditing }) => {
	return (
		<form onSubmit={e => handleSubmit(e, userToEdit, setUsers, setIsEditing)}>
			<h2>EDITAR USUARIO</h2>
			<div>
				<label htmlFor='name'>Name</label>
				<input
					onInput={e => setUserToEdit({ ...userToEdit, name: e.target.value })}
					type='text'
					name='name'
					id='name'
					value={userToEdit.name}
				/>
			</div>

			<div>
				<label htmlFor='email'>Email</label>
				<input
					onInput={e => setUserToEdit({ ...userToEdit, email: e.target.value })}
					type='text'
					name='email'
					id='email'
					value={userToEdit.email}
				/>
			</div>
			<input type='submit' value='Guardar Usuario' />
		</form>
	);
};

const handleSubmit = async (event, userToEdit, setUsers, setIsEditing) => {
	event.preventDefault();
	const { userId } = userToEdit;
	const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
		method: 'PATCH',
		body: JSON.stringify(userToEdit),
		headers: {
			Accept: '*/*',
			'Content-Type': 'application/json'
		}
	});
	const data = await response.json();
	setUsers(data);
	setIsEditing(false);
};

export default EditUser;
