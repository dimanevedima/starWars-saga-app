import React from 'react';
import {useSelector} from 'react-redux';

import {selectDetails} from '../redux/reducers/peopleDetails/selectors';

const Details = () => {

  const details = useSelector(selectDetails);
  console.log(details);


if(details.loading){
  return (
    <div style = {{textAlign:'center', fontSize: '50px', margin: '100px auto'}}>
      LOADING...
    </div>
  )
}else{
  const {
  name,
  height,
  mass,
  hair_color,
  skin_color,
  eye_color,
  birth_year,
  gender
} = details.data;
  return (
    <div style = {{textAlign:'center', fontSize: '30px', margin: '100px auto'}}>
    <h1>Details page</h1>
      <div>Name: {name}</div>
      <div>Height: {height}</div>
      <div>Mass: {mass}</div>
      <div>Hair color: {hair_color}</div>
      <div>Skin color: {skin_color}</div>
      <div>Eye color: {eye_color}</div>
      <div>Birth year: {birth_year}</div>
      <div>Gender: {gender}</div>
    </div>
  )
}
};

export default Details;
