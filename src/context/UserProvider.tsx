import { useState, useEffect, SetStateAction } from 'react';
import { User } from '../types/User';
import { UserContext } from './UserContext';

const apiUrl = 'https://dummyjson.com/users';

interface UserProviderProps {
	children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [users, setUsers] = useState<User[]>([]);
	const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
	const [nameFilter, setNameFilter] = useState('');
	const [cityFilter, setCityFilter] = useState('');
	const [highlightFeature, setHighlightFeature] = useState(false);
	const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

	useEffect(() => {
		fetch(apiUrl)
			.then((response) => response.json())
			.then((data) => {
				setUsers(data.users);
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

	return (
		<UserContext.Provider
			value={{
				users,
				filteredUsers,
				nameFilter,
				cityFilter,
				highlightFeature,
				setNameFilter,
				setCityFilter,
				setHighlightFeature,
				getOldestUsersByCity,
				oldestUsersByCity,
				handleNameFilterChange,
				handleCityFilterChange,
				handleHighlightFeatureChange
			}}
		>
			{children}
		</UserContext.Provider>
	);
};