import React, { Component } from 'react';
import classes from './Modal.module.css'

import Auxillary from '../../../hoc/Auxillary'
import Backdrop from '../Backdrop/Backdrop'


// const modal = (props) => {
//     return (
//         <div>

//         <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
//             Launch demo modal
//         </button>


//         <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//             <div className="modal-dialog">
//                 <div className="modal-content">
//                     <div className="modal-header">
//                         <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
//                         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                             <span aria-hidden="true">&times;</span>
//                         </button>
//                     </div>
//                     <div className="modal-body">
//                         ...
//       </div>
//                     <div className="modal-footer">
//                         <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//                         <button type="button" className="btn btn-primary">Save changes</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </div>
//     );
// }

class Modal extends Component {

    shouldComponentUpdate (nextProps,nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentDidUpdate(){
        console.log("MOdal update")
    }
    render() {
        return (
            <Auxillary>
                <Backdrop show={this.props.show} clicked={this.props.modalclosed} />
                <div className={classes.Modal} style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                    {this.props.children}
                </div>
            </Auxillary >
        );
    }
}

export default Modal