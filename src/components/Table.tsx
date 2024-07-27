import { useUserContext } from '../context/UserContext';

function Table() {
	const { filteredUsers, highlightFeature, oldestUsersByCity } = useUserContext();

	return (
		<table className='min-w-full border-collapse border border-gray-200 '>
			<thead>
				<tr className='bg-black'>
					<th className='border px-4 py-2 rounded-tl-lg'>Name</th>
					<th className='border px-4 py-2'>City</th>
					<th className='border px-4 py-2 rounded-tr-lg'>Birthday</th>
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
								? 'bg-blue-200'
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
	);
}

export default Table;
