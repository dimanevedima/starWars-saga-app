import React from 'react'

const LIMIT = 10;

const PeopleTablePagination = ({
  page,
  total,
  onChange, // функция принимающая page при изменении страницы
   }) => {

     const totalPages = Math.ceil(total/LIMIT);
     //console.log(totalPages);

     return (
       <div>
          {Array.from({length: totalPages},
                      (number, index) => index + 1)
                  .map(pageIndex => {
                    const isActive = pageIndex === page;
                    const action = () => {
                      if(pageIndex !== page)   onChange(pageIndex)
                    };
                    return isActive ? (
                        <b style = {{cursor: 'pointer', marginTop: '20px', display: 'inline-block'}} key = {pageIndex} onClick = {action}>
                          {' '}{pageIndex}{' '}
                        </b>
                    )
                    :
                    (
                      <span style = {{cursor: 'pointer'}} key = {pageIndex} onClick = {action}>
                        {' '}{pageIndex}{' '}
                      </span>
                    )
                  }
                  )}
       </div>
     )
   };

export default PeopleTablePagination;
