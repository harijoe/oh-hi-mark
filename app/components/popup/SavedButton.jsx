import React, { PropTypes } from 'react';
import BaseDoneIcon from 'material-ui/svg-icons/action/done';
import BaseDeleteIcon from 'material-ui/svg-icons/action/delete';
import FloatingActionButton from 'material-ui/FloatingActionButton';

class SavedButton extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {
      hovered: false,
    };
  }

  handleBtnClick = () => {
    if (!this.state.hovered) { return; }

    this.props.removePage();
  };

  render() {
    const DoneIcon = (<BaseDoneIcon
    />);
    const DeleteIcon = (<BaseDeleteIcon
    />);

    const Icon = this.state.hovered ? DeleteIcon : DoneIcon;
    const isRemoveBtn = this.state.hovered;

    return (<FloatingActionButton
      mini
      className={this.props.className}
      disabled={!isRemoveBtn}
      secondary={isRemoveBtn}
      onClick={this.handleBtnClick}
      onMouseEnter={() => this.setState({ hovered: true })}
      onMouseLeave={() => this.setState({ hovered: false })}
      >
      {Icon}
    </FloatingActionButton>
  );
  }
}

SavedButton.propTypes = {
  className: React.PropTypes.string,
  removePage: PropTypes.func,
};

export default SavedButton;
