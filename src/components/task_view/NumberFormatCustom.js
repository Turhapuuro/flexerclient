import React, {Component} from 'react';
import NumberFormat from 'react-number-format';

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

export default NumberFormatCustom;