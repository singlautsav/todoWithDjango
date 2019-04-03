
    import React, { Component } from "react";
    import {
      Button,
      Modal,
      ModalHeader,
      ModalBody,
      ModalFooter,
      Form,
      FormGroup,
      Input,
      Label
    } from "reactstrap";

    export default class CustomModal extends Component {
      constructor(props) {
        super(props);
        this.state = {
          activeItem: this.props.activeItem
        };
      }
      handleChange = e => {
        let { name, value } = e.target;
        if (e.target.type === "checkbox") {
          value = e.target.checked;
        }
        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({ activeItem });
      };
      render() {
        const { toggle, onSave } = this.props;
        return (
          <Modal isOpen={true} toggle={toggle}>
            <ModalHeader toggle={toggle}> Todo Item </ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="task">Task</Label>
                  <Input
                    type="text"
                    name="task"
                    value={this.state.activeItem.task}
                    onChange={this.handleChange}
                    placeholder="Enter Task"
                  />
                </FormGroup>
                <FormGroup>
                    <Label for="timeTaskl">Time</Label>
                    <Input
                      type="time"
                      name="timeTaskl"
                      value = {this.state.activeItem.timeTaskl}
                      onChange = {this.handleChange}
                      placeholder="time placeholder"
                    />
                </FormGroup>
                <FormGroup>
                  <Label for="dateEvent">Date</Label>
                  <Input
                    type="date"
                    name="dateEvent"
                    value = {this.state.activeItem.dateEvent}
                    onChange = {this.handleChange}
                    placeholder="date placeholder"
                  />
                </FormGroup>
                
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                Save
              </Button>
            </ModalFooter>
          </Modal>
        );
      }
    }