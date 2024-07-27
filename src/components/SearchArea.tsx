import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function SearchArea() {
	const { nameFilter, cityFilter, highlightFeature, users, handleCityFilterChange, handleNameFilterChange, handleHighlightFeatureChange } = useContext(UserContext);
	return (
		<div className='flex flex-row w-3/4 m-10 gap-10 justify-start items-center'>
			<div className="flex flex-col">
				<label htmlFor="nameFilter" className="font-bold">Name:</label>
				<input
					type="text"
					value={nameFilter}
					onChange={handleNameFilterChange}
					placeholder="Filter by name"
				/>
			</div>
			<div className="flex flex-col min-w-[200px]">
				<label htmlFor="cityFilter" className="font-bold">City:</label>
				<select value={cityFilter} onChange={handleCityFilterChange}>
					<option value="">All Cities</option>
					{[...new Set(users.map((user) => user.address.city))].map((city) => (
						<option key={city} value={city}>
							{city}
						</option>
					))}
				</select>
			</div>
			<div className=' flex flex-row items-center gap-4 min-h-full'>
				<div >Highlight Oldest <br></br>Per City:</div>
				<input
					className='h-5 w-5'
					type="checkbox"
					checked={highlightFeature}
					onChange={handleHighlightFeatureChange}
				/>
			</div>
		</div>
	);
}

export default SearchArea;