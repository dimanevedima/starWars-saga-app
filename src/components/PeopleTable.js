import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

import {selectPeople} from '../redux/reducers/people/selectors';

import PeopleTablePagination from '../components/PeopleTablePagination';

const PeopleTable = () => {
  const dispatch = useDispatch();

  const people = useSelector(selectPeople);
  //console.log(people);

  const changePage = newPage => dispatch({
    type: 'LOAD_USERS',
    payload: {
      page: newPage,
      search: people.search,
    },
  });

  const search = e => dispatch({
    type: 'LOAD_USERS',
    payload: {
      page: 1,
      search: e.target.value,
    },
  });



  return (
    <>
    <h1>
      Star wars People

      <form action = "">
        <input
        style = {{padding : '5px 20px', marginLeft: '20px'}}
        type = "text"
        value = {people.search}
        placeholder = "Search character..."
        onChange = {search}/>
      </form>
    </h1>
    {people.loading ?
      (<div>LOADING...</div>)
    :
      (<div>
        <p style = {{marginBottom: '20px' }}>LOADED!</p>
        <>
        <table border = {1} width = "100%" cellPadding = {2} callspacing = {0}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Birth year</th>
              <th>Eye color</th>
              <th>Gender</th>
              <th>Hair color</th>
              <th>Height</th>
              <th>Mass</th>
              <th>&#9883;</th>
            </tr>
          </thead>

          <tbody>
           {
             people?.data?.results.map(character => {
               // заменить в url все нечисловые элементы на пустую строку
               const id = character.url.replaceAll(/\D/g, '');
               return (
                <tr key = {character.name}>
                  <td>{character.name}</td>
                  <td>{character.birth_year}</td>
                  <td>{character.eye_color}</td>
                  <td>{character.gender}</td>
                  <td>{character.hair_color}</td>
                  <td>{character.height}</td>
                  <td>{character.mass}</td>
                  <td>
                    <Link style={{ color: '#b8261c', textDecoration: 'inherit'}} to = {`/people/${id}`}>
                      Details
                    </Link>
                  </td>
                </tr>
               )
             })
           }
          </tbody>
        </table>
        </>
        <PeopleTablePagination
        page = {people.page}
        total = {people.data.count}
        onChange = {changePage}/>
      </div>)
    }
    </>
  )
}

export default PeopleTable;
