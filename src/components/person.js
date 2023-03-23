
// import { useTable, useFilters, useGlobalFilter, useRowSelect } from 'react-table'
// // import { useSticky } from 'react-table-sticky'
// // import { Styles } from './TableStyles'
// import MOCK_DATA from './MOCK_DATA.json'
// import { COLUMNS_PERSON } from './columns_person'
// import './table.css'
// import { GlobalFilter } from './GlobalFilter'
// import { ColumnFilter } from './ColumnFilter'
// import { Checkbox } from './Checkbox'

// export const person = () => {
//   const columns = useMemo(() => COLUMNS_PERSON, [])
//   const data = useMemo(() => MOCK_DATA, [])

//   const defaultColumn = React.useMemo(
//     () => ({
//       Filter: ColumnFilter
//     }),
//     []
//   )

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     footerGroups,
//     rows,
//     prepareRow,
//     selectedFlatRows,
//     state,
//     setGlobalFilter
//     } = useTable(
//     {
//       columns,
//       data,
//       defaultColumn
//     },
//     useFilters,
//     useGlobalFilter,
//     useRowSelect,
    
//     hooks => {
//       hooks.visibleColumns.push(columns => [
//         {
//           id: 'selection',
//           Header: ({ getToggleAllRowsSelectedProps }) => (
//             <Checkbox {...getToggleAllRowsSelectedProps()} />
//           ),
//           Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
//         },
//         ...columns
//       ])
//     }
//   )

//   const { globalFilter } = state

//   return (
//     <>
//       <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
//       <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map(headerGroup => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map(column => (
//                 <th {...column.getHeaderProps()}>
//                   {column.render('Header')}
//                   <div>{column.canFilter ? column.render('Filter') : null}</div>
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map(row => {
//             prepareRow(row)
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map(cell => {
//                   return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                 })}
//               </tr>
//             )
//           })}
//         </tbody>
//         <tfoot>
//           {footerGroups.map(footerGroup => (
//             <tr {...footerGroup.getFooterGroupProps()}>
//               {footerGroup.headers.map(column => (
//                 <td {...column.getFooterProps()}>{column.render('Footer')}</td>
//               ))}
//             </tr>
//           ))}
//         </tfoot>
//       </table>
//       <pre>
//         <code>
//           {JSON.stringify(
//             {
//               selectedFlatRows: selectedFlatRows.map(row => row.original)
//             },
//             null,
//             2
//           )}
//         </code>
//       </pre>
//     </>
//   )
// }
