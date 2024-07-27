
import { useUserContext } from './context/UserContext';


function App() {

	const { users, filteredUsers, nameFilter, cityFilter, highlightFeature, oldestUsersByCity, handleNameFilterChange, handleCityFilterChange, handleHighlightFeatureChange } = useUserContext();
	if (!users) return <div>Loading...</div>;
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
