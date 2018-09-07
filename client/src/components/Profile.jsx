import React, { Component } from 'react';
import { Segment, Form, Header, Grid, Divider } from 'semantic-ui-react';

const styles = {
    formLabel: { width: 155 },
    segmentHeader: { borderRadius: 0 }
};

const InputLabel = (props) => (
    <label style={styles.formLabel}> {props.content} </label>
);

const SegmentChunk = (props) => (
    <Segment.Group>
        <Segment as={Header} style={styles.segmentHeader} color='violet'>
            {props.title}
        </Segment>
        <Segment padded='very'>
            {props.children}
        </Segment>
    </Segment.Group>
);

class Profile extends Component {
    render() {
        return (
            <Segment.Group>
                <Segment as={Header} color="violet" inverted>
                    Account details
                </Segment>

                <Segment>
                    <Grid stackable columns={2}>
                        <Grid.Column>
                            <Segment.Group>
                                <Segment as={Header} color='violet' style={{ borderRadius: 0 }}>
                                    Change password
                            </Segment>
                                <Segment padded='very'>
                                    <Form>
                                        <Form.Input inline required label={<InputLabel content={"Current password"} />} type="password" />
                                        <Form.Input inline required label={<InputLabel content={"New password"} />} type="password" />
                                        <Form.Input inline required label={<InputLabel content={"Repeat new password"} />} type="password" />
                                        <Divider />
                                        <Form.Button color='green' inverted>
                                            Change Password
                                        </Form.Button>
                                    </Form>
                                </Segment>
                            </Segment.Group>
                        </Grid.Column>

                        <Grid.Column>
                            <SegmentChunk title="Change username">
                                <Form>
                                    <Form.Input inline label={<InputLabel content="Current username" />} readOnly />
                                    <Form.Input inline required label={<InputLabel content="New username" />} />
                                    <Divider />
                                    <Form.Button color='green' inverted>
                                        Change Username
                                    </Form.Button>
                                </Form>
                            </SegmentChunk>
                        </Grid.Column>

                    </Grid>
                </Segment>
            </Segment.Group>
        );
    }
}

export default Profile;