import { format } from 'date-fns'

export const COLUMNS_PERSON = [
  {
    Header: 'SSN',
    Footer: 'SSN',
    accessor: 'SSN',
    // disableFilters: true,
    sticky: 'left'
  },
  {
    Header: 'First Name',
    Footer: 'First Name',
    accessor: 'first_name',
    sticky: 'left'
  },
  {
    Header: 'Last Name',
    Footer: 'Last Name',
    accessor: 'last_name',
    sticky: 'left'
  },
  // {
  //   Header: 'Date of Birth',
  //   Footer: 'Date of Birth',
  //   accessor: 'date_of_birth',
  //   Cell: ({ value }) => {
  //     return format(new Date(value), 'dd/MM/yyyy')
  //   }
  // },
  {
    Header: 'Address',
    Footer: 'Address',
    accessor: 'Address'
  },
  {
    Header: 'Phone',
    Footer: 'Phone',
    accessor: 'phone'
  },
  // {
  //   Header: 'Email',
  //   Footer: 'Email',
  //   accessor: 'email'
  // },
  // {
  //   Header: 'Age',
  //   Footer: 'Age',
  //   accessor: 'age'
  // },
]

export const GROUPED_COLUMNS = [
  {
    Header: 'SSN',
    Footer: 'SSN',
    accessor: 'SSN'
  },
  {
    Header: 'Name',
    Footer: 'Name',
    columns: [
      {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name'
      },
      {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor: 'last_name'
      }
    ]
  },
  {
    Header: 'Info',
    Footer: 'Info',
    columns: [
      // {
      //   Header: 'Date of Birth',
      //   Footer: 'Date of Birth',
      //   accessor: 'date_of_birth'
      // },
      {
        Header: 'Address',
        Footer: 'Address',
        accessor: 'Address'
      },
      {
        Header: 'Phone',
        Footer: 'Phone',
        accessor: 'phone'
      }
    ]
  }
]
