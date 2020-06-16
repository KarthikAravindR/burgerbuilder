import React, { Component } from 'react';
import Auxillary from '../../hoc/Auxillary';
import './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import backgroundimage from '../../assets/images/backgroundimage.jpg'
import { connect } from 'react-redux'

class Layout extends Component {
    state = {
        showsidebar: false,
    }
    sidebarshowhandler = (props) => {
        this.setState({
            showsidebar:true
        })
    }
    backdrophandler = (props) => {
        this.setState({
            showsidebar:false
        })
    }
    render() {
        return (
            <Auxillary>
                <img className='Bgimg' src={backgroundimage} alt =' '/>
                {/* <div className='Bgimg'><a href="https://www.freepik.com/free-photos-vectors/frame"></a></div> */}
                <Toolbar sidestate={this.state.showsidebar} isAuthenticated={this.props.isAuthenticated} sideshow={this.sidebarshowhandler}/>
                <SideDrawer closed={this.state.showsidebar} isAuthenticated={this.props.isAuthenticated} open={this.backdrophandler}/>
                <div className='Content'>{this.props.children}</div>
            </Auxillary>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)