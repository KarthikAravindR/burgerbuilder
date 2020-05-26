import React from "react"
import classes from './Input.module.css'

const input = (props) => {

    let inputelement = null
    console.log(props.validity)
    let allclass = [classes.No]
    if(!props.validity && props.shouldvalidate) {
        allclass.push(classes.Invalid)
    }
    switch (props.elementtype) {
        case 'input':
            inputelement = <input onChange={props.changd} className={classes.Inputelement} {...props.elementconfig} value={props.value}/>
            break;
        case 'select':
            inputelement = <select onChange={props.changd} className={classes.Inputelement} value={props.value}>
                {props.elementconfig.options.map(option => (
                    <option key={option.value} value={option.value}>{option.displayvalue}</option>
                ))}
            </select>
            break;
        case 'textarea':
            inputelement = <textarea onChange={props.changd} className={classes.Inputelement} {...props.elementconfig} value={props.value}/>
            break;
        default :
            inputelement = <input onChange={props.changd} className={classes.Inputelement} {...props.elementconfig} value={props.value}/>
    }
    

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputelement}
            <p className={allclass.join(' ')}>*This Field is required*</p>  
        </div>
    )
}

export default input

