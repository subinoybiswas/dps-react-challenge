import { createContext, useContext } from 'react';
import { User } from '../types/User';
interface UserContextData {
	users: User[];
	filteredUsers: User[];
	nameFilter: string;
	cityFilter: string;
	highlightFeature: boolean;
	setNameFilter: React.Dispatch<React.SetStateAction<string>>;
	setCityFilter: React.Dispatch<React.SetStateAction<string>>;
	setHighlightFeature: React.Dispatch<React.SetStateAction<boolean>>;
	getOldestUsersByCity: () => { [key: string]: User };
	oldestUsersByCity: { [key: string]: User };
	handleNameFilterChange: (event: { target: { value: string; }; }) => void;
	handleCityFilterChange: (event: { target: { value: string; }; }) => void;
	handleHighlightFeatureChange: (event: { target: { checked: boolean; }; }) => void;
	
}

const UserContext = createContext<UserContextData>({} as UserContextData);

const useUserContext = () => useContext(UserContext);

export { UserContext, useUserContext };