import React from 'react';

import './styles.css';

import CustomTable from './components/CustomTable';

// link : https://randomuser.me/api?results=20
//
// task 1: fetch the data
// task 2: grab the location data, flatten it and display on table
// task 3: click on a header and sort the table by that column
// task 4: either do a ascending-descending-unsorted option or do an input search
//

const App = () => {

  return (
    <div className="container">
      hello world! here are some locations:
      <br/>
      <br/>

      <CustomTable />

    </div>
  );

}

export default App;
