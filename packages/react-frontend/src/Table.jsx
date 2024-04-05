// src/Table.jsx
import React from 'react'

/* thead = table heading, tr = table row, td = table data */
/* breaking up table into serparate compononents */

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
      </tr>
    </thead>
  )
}

function TableBody(props) {
  /* use props to map an array to return a table row for each object in the array */
  const rows = props.characterData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.job}</td>
      </tr>
    )
  })
  return <tbody>{rows}</tbody>
}
function Table(props) {
  return (
    /* need to be able to access the data(characterData) on this side */
    <table>
      <TableHeader />
      <TableBody characterData={props.characterData} />
    </table>
  )
}
export default Table
