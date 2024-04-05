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

function TableBody() {
  return (
    <tbody>
      <tr>
        <td>Charlie</td>
        <td>Janitor</td>
      </tr>
      <tr>
        <td>Mac</td>
        <td>Bouncer</td>
      </tr>
      <tr>
        <td>Dee</td>
        <td>Aspiring actress</td>
      </tr>
      <tr>
        <td>Dennis</td>
        <td>Bartender</td>
      </tr>
    </tbody>
  )
}
function Table() {
  return (
    <table>
      <TableHeader />
      <TableBody />
    </table>
  )
}
export default Table
