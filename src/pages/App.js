import React from 'react';
//import {useSelector} from 'react-redux';

//import {selectPeople} from '../redux/reducers/people/selectors';

import PeopleTable from '../components/PeopleTable';


const App = () => {
  //const people = useSelector(store => store.people);
  //const people = useSelector(selectPeople);
  //console.log(people);

  return (
    <div style = {{padding: '70px', textAlign: 'center'}}>
    <PeopleTable/>

  </div>
  );
};

export default App;
