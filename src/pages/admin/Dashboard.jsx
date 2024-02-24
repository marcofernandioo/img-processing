import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';

// import { users } from 'src/_mock/user';
const users = [];

// import Iconify from 'src/components/iconify';
// import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../../components/CustomerTable/table-no-data';
import UserTableRow from '../../components/CustomerTable/user-table-rows';
import UserTableHead from '../../components/CustomerTable/user-table-head';
import TableEmptyRows from '../../components/CustomerTable/table-empty-rows';
import UserTableToolbar from '../../components/CustomerTable/user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../../components/CustomerTable/utils';

import * as api from '../../api'
import { useContext } from 'react';
import CustomerDetail from './CustomerDetail';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [openDetails, setOpenDetails] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState({});

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [customerList, setCustomerList] = useState([]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (event, name) => {
  //   console.log(name);
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  const handleButtonClick = (key) => {
    setSelectedCustomer(customerList[key]);
    // console.log(key);
    console.log(customerList[key])
    setOpenDetails(!openDetails);
  }

  const handleChangeCustomer = e => {
    const name = e.target.name
    const val = e.target.value
    setSelectedCustomer({ ...data, [name]: val })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  useEffect(() => {
    const jwtAccess = document.cookie.split('=')[1];
    console.log(jwtAccess);
    api.getAllCustomers(jwtAccess)
      .then((data) => {
        setCustomerList(data.data);
      })
  }, [])


  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button>
      </Stack>

      {
        openDetails ? (
          <>
            <Button onClick={() => setOpenDetails(!openDetails)}>Back</Button>
            <CustomerDetail user={selectedCustomer} handleChangeData={handleChangeCustomer} />
          </>
        ) : (
          <Card>
            <UserTableToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            {/* <Scrollbar> */}
            {
              customerList ? (
                <TableContainer sx={{ overflow: 'unset' }}>
                  <Table sx={{ minWidth: 800 }}>
                    <UserTableHead
                      order={order}
                      orderBy={orderBy}
                      rowCount={users.length}
                      numSelected={selected.length}
                      onRequestSort={handleSort}
                      onSelectAllClick={handleSelectAllClick}
                      headLabel={[
                        { id: 'username', label: 'Name' },
                        { id: 'email', label: 'Email' },
                        { id: 'role', label: 'Role' },
                        // { id: 'isVerified', label: 'Verified', align: 'center' },
                        // { id: 'status', label: 'Status' },
                        { id: '' },
                      ]}
                    />
                    <TableBody>
                      {
                        customerList
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row,index) => (
                            <UserTableRow
                              key={row._id}
                              id={row._id}
                              name={row.username}
                              role={row.role}
                              status={"Active"}
                              company={row.company}
                              email={row.email}
                              isVerified={row.isVerified}
                              selected={selected.indexOf(row.name) !== -1}
                              openDetails={openDetails}
                              handleButtonClick={() => handleButtonClick(index)}
                            />
                          ))
                      }

                      <TableEmptyRows
                        height={77}
                        emptyRows={emptyRows(page, rowsPerPage, users.length)}
                      />

                      {notFound && <TableNoData query={filterName} />}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : <div></div>
            }
            {/* </Scrollbar> */}

            <TablePagination
              page={page}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        )
      }

    </Container>
  );
}