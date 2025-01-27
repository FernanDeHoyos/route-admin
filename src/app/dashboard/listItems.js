import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const mainListItems = (handleListItemClick) => (
  <React.Fragment>
    <ListItemButton onClick={() => handleListItemClick('/')}>
      <ListItemIcon>
        <DashboardIcon sx={{ color: '#fff' }} />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton onClick={() => handleListItemClick('/inventario')}>
      <ListItemIcon>
        <ShoppingCartIcon sx={{ color: '#fff' }} />
      </ListItemIcon>
      <ListItemText primary="Inventario" />
    </ListItemButton>
    <ListItemButton onClick={() => handleListItemClick('/agregar-producto')}>
      <ListItemIcon>
        <PeopleIcon sx={{ color: '#fff' }} />
      </ListItemIcon>
      <ListItemText primary="Agregar Producto" />
    </ListItemButton>
    <ListItemButton onClick={() => handleListItemClick('/pedidos')}>
      <ListItemIcon>
        <BarChartIcon sx={{ color: '#fff' }} />
      </ListItemIcon>
      <ListItemText primary="Pedidos" />
    </ListItemButton>
    <ListItemButton onClick={() => handleListItemClick('/reportes')}>
      <ListItemIcon>
        <LayersIcon sx={{ color: '#fff' }} />
      </ListItemIcon>
      <ListItemText primary="Reportes" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset sx={{ color: '#fff', background: '#000' }}>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon sx={{ color: '#fff' }} />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon sx={{ color: '#fff' }} />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon sx={{ color: '#fff' }} />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);