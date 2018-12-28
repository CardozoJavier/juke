import React from 'react';
import { Link } from 'react-router-dom';

export default () => {

	// console.log ('==> ', props);
	return (
		<div>
			<h3>Stations</h3>
			<div className="list-group">
				{
					DUMMY_STATIONS_DATA.map(station => {
						return (
							<div className="list-group-item" key={station.name}>
								<Link to={'fill/me/in/later'}>{station.name}</Link>
							</div>
						);
					})
				}
			</div>
		</div>
	)	
}

const DUMMY_STATIONS_DATA = [
  { name: '90s Hip Hop' },
  { name: 'Death Metal' },
  { name: 'Classical' }
];