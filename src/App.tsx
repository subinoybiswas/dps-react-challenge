
import SearchArea from './components/SearchArea';
import Table from './components/Table';
import { useUserContext } from './context/UserContext';


function App() {

	const { users } = useUserContext();
	if (!users) return <div>Loading...</div>;
	return (
		<div className='w-screen'>
			<SearchArea />
			<div className='w-3/4 m-10'>
				<Table />
			</div>
		</div>
	);
}

export default App;
