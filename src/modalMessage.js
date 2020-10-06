import React from "react";

export default class ModalMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cssStyle: "blue",
            modalOpen: true,
        };
    }
    componentDidMount() {
        // console.log('Uploader just mounted');
    }
    closeModal() {
        this.setState({ modalOpen: false });
    }
    handleChange(e) {
        console.log("handle changed!");
        this.setState({ file: e.target.files[0] });
    }
    render() {
        const { message, button, destination } = this.props;
        return (
            <>
                {this.state.modalOpen && (
                    <div className="modal column">
                        <div className="modal-header">
                            <h4> {message} </h4>
                            <h4
                                className="close-modal"
                                onClick={this.closeModal()}
                            >
                                X
                            </h4>
                        </div>
                        <div
                            onClick={() => this.updatePicture()}
                            className="button"
                        >
                            {button}
                        </div>
                    </div>
                )}
            </>
        );
    }
}

// do v-bind in parent!
// to call e.g. this.props.updateState({ imageUrl: data.imageUrl }); // data...
