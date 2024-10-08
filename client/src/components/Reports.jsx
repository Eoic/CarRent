import React, { Component } from 'react'
import ReservedRents from './ReservedRents';
import EndedRents from './EndedRents';
import ActiveRents from './ActiveRents';
import RentInfoModal from './RentInfoModal';
import Printer from './Printer';

class Reports extends Component {
    render() {
        const { active, reserved, ended } = this.props.match.params;

        return (
            <div>
                <RentInfoModal />
                <Printer />
                <ActiveRents page={{ active, reserved, ended }} />
                <ReservedRents page={{ active, reserved, ended }} />
                <EndedRents page={{ active, reserved, ended }} />
            </div>
        );
    }
}

export default Reports;