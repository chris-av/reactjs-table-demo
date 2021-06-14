import React, { useState, useEffect } from 'react';
import { queryData } from '../api.js';


// use generator function to cycle through sorting!
const cycleSorts = function*(steps) {
  // while (true) {
  //   yield* steps
  // };
  while (true) { yield* steps; }
}

// have a cycle for each column?
const sorting = cycleSorts([ 'ascending', 'descending', 'default' ]);

const CustomTable = () => {

  const [ locations, setLocations ] = useState([]);
  const [ sort, setSort ] = useState('');

  const parseLocation = locobj => {
    const {
      city, country, postcode, state,
      coordinates: { latitude, longitude }
    } = locobj;
    return [ country, city, state, postcode, longitude, latitude ];
  }

  const sortColumn = column => {

    // console.log('running sort column for column : ' + column);

    setSort(sorting.next().value);

    let sortIndex = 0;

    if (column === 'country') sortIndex = 0;
    if (column === 'city') sortIndex = 1;
    if (column === 'state') sortIndex = 2;
    if (column === 'postcode') sortIndex = 3;
    if (column === 'longitude') sortIndex = 4;
    if (column === 'latitude') sortIndex = 5;

    // sort based on index of each array
    // recreate a new array then setstate that new array

    let oldarr = [ ...locations ];

    const newarr = oldarr.sort((a, b) => {
      if (sort === 'ascending') {
        // console.log('sorting ascending');
        if (a[1][sortIndex] < b[1][sortIndex]) return -1;
        if (a[1][sortIndex] > b[1][sortIndex]) return 1;
        if (a[1][sortIndex] === b[1][sortIndex]) return 0;
      } else if (sort === 'descending'){
        // console.log('sorting descending');
        if (a[1][sortIndex] < b[1][sortIndex]) return 1;
        if (a[1][sortIndex] > b[1][sortIndex]) return -1;
        if (a[1][sortIndex] === b[1][sortIndex]) return 0;
      } else if (sort === 'default') {
        // console.log('sorting default');
        if (a[0] < b[0]) return -1;
        if (a[0] > b[0]) return 1;
        if (a[0] === b[0]) return 0;
      }
      return 0;
    });

    setLocations(newarr);

  }


  useEffect(() => {

    console.log('firing use effect');

    setSort(sorting.next().value);

    queryData()
      .then(data => {
        let locs = [];
        data.results.forEach((res, i) => {
          let parsedLoc = parseLocation(res.location);

          locs.push([ i, parsedLoc ])
        });
        setLocations(locs);
      })
      .catch(err => console.error(err))
  }, []);


  return (
    <table>
      <thead>
        <tr>
          <th className="country" onClick={() => sortColumn('country')}>Country</th>
          <th className="city" onClick={() => sortColumn('city')}>City</th>
          <th className="state" onClick={() => sortColumn('state')}>State</th>
          <th className="postcode" onClick={() => sortColumn('postcode')}>Postcode</th>
          <th className="longitude" onClick={() => sortColumn('longitude')}>Longitude</th>
          <th className="latitude" onClick={() => sortColumn('latitude')}>Latitude</th>
        </tr>
      </thead>
      <tbody>
        {
          locations.map((loc, i) => (
            <tr key={i}>
              { loc[1].map((item, j) => <td key={j} className={`${[ 'country', 'city', 'state', 'postcode', 'longitude', 'latitude' ][j]}`}>{item}</td>) }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default CustomTable;
