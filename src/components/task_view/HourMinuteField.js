import React, { Component } from 'react';
import Input from 'material-ui/Input';
import NumberFormat from 'react-number-format';
import { withStyles } from 'material-ui/styles';


const styles = (theme) => ({
    // Add component styles here.
});

class NumberFormatCustom extends Component {
    render() {
        return (
            <NumberFormat
                {...this.props}
                onValueChange={values => {
                    this.props.onChange({
                        target: {
                            value: values.value,
                        },
                    });
                }}
                format="##:##"
                placeholder={this.props.placeholder}
            />
        );
    }
}

const HourMinuteField = (props) => {
    const { placeholder, value, onChange, } = props;
    return (
        <Input
            placeholder={placeholder}
            value={value}
            inputComponent={NumberFormatCustom}
            inputProps={{'placeholder':placeholder}}
            onChange={onChange}
        />
    );
};

export default withStyles(styles, { withThem: true })(HourMinuteField);
