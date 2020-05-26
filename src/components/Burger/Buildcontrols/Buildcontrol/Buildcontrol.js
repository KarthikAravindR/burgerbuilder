import React  from 'react';
import classes from './Buildcontrol.module.css';

const buildcontrol = (props) => (
    <div className={classes.Buildcontrol}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} onClick={props.removed} disabled={props.disable}>Less</button>
        <button className={classes.More} onClick={props.added}>More</button>
    </div>
)

export default buildcontrol