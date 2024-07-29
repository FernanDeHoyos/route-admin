import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  TextField, IconButton, Typography, TableContainer, Paper,
  TablePagination, RadioGroup, FormControlLabel, Radio, Link, Grid, Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { products } from '@/app/data/data';
import { useShopStore } from '@/app/hooks/useShopStore';

export const InventaryTable = () => {
  const {setActiveProduct} = useShopStore()
  const [filter, setFilter] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterType, setFilterType] = useState('');

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    applyFilters(value, filterType);
  };

  const handleFilterTypeChange = (e) => {
    const value = e.target.value;
    setFilterType(value);
    applyFilters(filter, value);
  };

  const applyFilters = (nameFilter, typeFilter) => {
    setFilteredProducts(products.filter(product =>
      (nameFilter ? product.name.toLowerCase().includes(nameFilter) || product.referencia.toLowerCase().includes(nameFilter) : true) &&
      (typeFilter ? product.type === typeFilter : true)
    ));
  };

  const handleEdit = (id) => {
    // Lógica para editar producto
    console.log('Edit product with id:', id);
  };

  const handleDelete = (id) => {
    // Lógica para eliminar producto
    console.log('Delete product with id:', id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDetails = (product) => {
    setActiveProduct(product)
  }
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Inventario de Productos
      </Typography>
      <Grid item  xs={12} 
      sx={{
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'space-between',}} >

      <TextField
        variant="outlined"
        label="Buscar"
        value={filter}
        onChange={handleFilterChange}
        InputProps={{
          endAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          )
        }}
        sx={{ margin: 2 }}
      />

      <RadioGroup row value={filterType} onChange={handleFilterTypeChange} sx={{ margin: 2 }}>
        <FormControlLabel value="" control={<Radio />} label="Todos" />
        <FormControlLabel value="Camisetas" control={<Radio />} label="Camisetas" />
        <FormControlLabel value="Accesorios" control={<Radio />} label="Accesorios" />
        <FormControlLabel value="Calzados" control={<Radio />} label="Calzados" />
        <FormControlLabel value="Jeans" control={<Radio />} label="Jeans" />
      </RadioGroup>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Referencia</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Género</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>U. disponibles</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{product.referencia}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.type}</TableCell>
                <TableCell>{product.genero}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleDetails(product)}  sx={{ marginRight: 2 }}>
                    Detalles
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredProducts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
};

