import React, { Component } from 'react';

// Material UI
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import ListItemIcon from 'material-ui/List/ListItemIcon';
import ListItemText from 'material-ui/List/ListItemText';
import Button from 'material-ui/Button';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLessIcon from 'material-ui-icons/ExpandLess';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

class CoreMenuRender extends Component
{
  state = { expand: false };

  render() {
    const { tree, prefix } = this.props;
    const { expand } = this.state;

    if (! tree.items) {
      return (
        <ListItem button component="div" href={`${prefix}/${tree.path}`}>
          <ListItemText primary={tree.name} />
        </ListItem>
      );
    }

    return (
      <div>
        <ListItem style={{ width: '100%' }} component={Button} onClick={() => this.handleExpandClick()}>
          <ListItemText style={{ textAlign: 'left' }} primary={tree.name} />
          <ListItemIcon>
            { expand ? (<ExpandLessIcon />) : (<ExpandMoreIcon />) }
          </ListItemIcon>
        </ListItem>
        <Collapse transitionDuration="auto" unmountOnExit in={expand}>
          <List style={{ paddingLeft: 16 }}>
            {tree.items.map((item, key) => (
              <CoreMenuRender key={key} tree={item} prefix={`${prefix}/${tree.path}`} />
            ))}
          </List>
        </Collapse>
      </div>
    );

  }

  handleExpandClick() {
    this.setState({ expand: ! this.state.expand });
  }
}

export default CoreMenuRender;
