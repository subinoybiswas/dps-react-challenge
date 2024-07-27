import { useState, useEffect, SetStateAction } from 'react';
import { User } from './types/User';

const apiUrl = 'https://dummyjson.com/users';

function App() {
	const [users, setUsers] = useState<User[]>([]);
	const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
	const [nameFilter, setNameFilter] = useState('');
	const [cityFilter, setCityFilter] = useState('');
	const [highlightFeature, setHighlightFeature] = useState(false);
	const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

	useEffect(() => {
		fetch(apiUrl)
			.then(response => response.json())
			.then(data => {
				setUsers(data.users);
				console.log(data.users);
				setFilteredUsers(data.users);
			});
	}, []);

	const handleNameFilterChange = (event: { target: { value: string; }; }) => {
		const { value } = event.target;
		setNameFilter(value);
		setCityFilter('');
		if (debounceTimeout) {
			clearTimeout(debounceTimeout);
		}
		setDebounceTimeout(
			setTimeout(() => {
				const filteredUsers = users.filter((user) =>
					user.firstName.toLowerCase().includes(value.toLowerCase()) ||
					user.lastName.toLowerCase().includes(value.toLowerCase())
				);
				setFilteredUsers(filteredUsers);
			}, 100)
		);
	};

	const handleCityFilterChange = (event: { target: { value: SetStateAction<string>; }; }) => {
		setCityFilter(event.target.value);
		setNameFilter('');
		const filteredUsers = users.filter((user) => user.address.city === event.target.value);
		setFilteredUsers(filteredUsers);
	};

	const handleHighlightFeatureChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
		setHighlightFeature(event.target.checked);
	};

	const getOldestUsersByCity = () => {
		const oldestUsersByCity: { [key: string]: User } = {};

		users.forEach((user) => {
			const userCity = user.address.city;
			if (!oldestUsersByCity[userCity] || user.age > oldestUsersByCity[userCity].age) {
				oldestUsersByCity[userCity] = user;
			}
		});

		return oldestUsersByCity;
	};

	const oldestUsersByCity = highlightFeature ? getOldestUsersByCity() : {};

	if (users.length === 0) {
		return <div>Loading...</div>;
	}

	return (
		<div className='w-screen'>
			<div className='flex flex-row w-3/4 m-10 gap-5 justify-start'>
				<div>
					<label htmlFor="nameFilter">Name:</label>
					<input
						type="text"
						value={nameFilter}
						onChange={handleNameFilterChange}
						placeholder="Filter by name"
					/>
				</div>
				<div>
					<label htmlFor="cityFilter">City:</label>
					<select value={cityFilter} onChange={handleCityFilterChange}>
						<option value="">All Cities</option>
						{[...new Set(users.map((user) => user.address.city))].map((city) => (
							<option key={city} value={city}>
								{city}
							</option>
						))}
					</select>
				</div>
				<div className='flex flex-row items-center gap-4'>
					<label htmlFor="highlightFeature">Highlight Oldest Per City:</label>
					<input
						className='h-5 w-5'
						type="checkbox"
						checked={highlightFeature}
						onChange={handleHighlightFeatureChange}
					/>
				</div>
			</div>

			<div className='w-3/4 m-10'>
				<h2>Filtered Users:</h2>
				<table className='min-w-full border-collapse border border-gray-200'>
					<thead>
						<tr className='bg-black'>
							<th className='border px-4 py-2'>Name</th>
							<th className='border px-4 py-2'>City</th>
							<th className='border px-4 py-2'>Birthday</th>
						</tr>
					</thead>
					<tbody>
						{filteredUsers.map((user) => (
							<tr
								key={user.id}
								className={
									highlightFeature &&
										oldestUsersByCity[user.address.city] &&
										oldestUsersByCity[user.address.city].id === user.id
										? 'bg-yellow-200'
										: ''
								}
							>
								<td className='border px-4 py-2'>{`${user.firstName} ${user.lastName}`}</td>
								<td className='border px-4 py-2'>{user.address.city}</td>
								<td className='border px-4 py-2'>{user.birthDate}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default App;
