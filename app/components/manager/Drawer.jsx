import React from 'react';
import BaseDrawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

function Drawer() {
  return (
    <div>
      <RaisedButton
        label="Toggle Drawer"
      />
      <BaseDrawer open>
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
      </BaseDrawer>
    </div>
  );
}

export default Drawer;
