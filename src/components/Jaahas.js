import React, {Component}from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

class Jaahas extends Component{
    render(){
        const style = {
            margin: 12,
        };

        return (
            <div>
                <RaisedButton label="Jaahas" style={style} secondary={true}/>
                <FontIcon className="material-icons">home</FontIcon>
                <RaisedButton label="Matias" labelPosition="before" primary={true}
                    icon={<FontIcon className="material-icons">announcement</FontIcon>}
                    style={style}>
                </RaisedButton>
                <IconButton>
                    <FontIcon className="material-icons">announcement</FontIcon>
                </IconButton>
            </div>
        )
    }
}

export default Jaahas;