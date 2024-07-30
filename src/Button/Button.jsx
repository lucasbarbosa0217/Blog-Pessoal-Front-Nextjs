import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from "./button.module.css";

class Button extends Component {
    render() {
        return (
            <button className={styles.button} onClick={this.props.onClick}>{this.props.children}</button>
        );
    }
}
Button.propTypes = {};

export default Button;