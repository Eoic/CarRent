import React from 'react';

const InfoField = (props) => (
    <div>
        <label style={{ float: 'left', fontWeight: 'bold', fontSize: 13 }}> {props.label} </label>
        <p style={{ float: 'right' }}> {props.value} </p>
        <div style={{ clear: 'both' }} />
    </div>
)

export default InfoField;