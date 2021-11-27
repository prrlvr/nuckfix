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
    Label,
} from "reactstrap";

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
        };
    }

    handleChange = (e) => {
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
                        <ModalHeader toggle={toggle}>Entrer un nouveau produit</ModalHeader>
                        <ModalBody>
                          <Form>
                            <FormGroup>
                              <Label for="name">Nom du produit</Label>
                              <Input
                                type="text"
                                id="name"
                                name="name"
                                value={this.state.activeItem.name}
                                onChange={this.handleChange}
                                placeholder="Renseigner le nom du produit"
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="quantity">Quantité</Label>
                              <Input
                                type="text"
                                id="quantity"
                                name="quantity"
                                value={this.state.activeItem.quantity}
                                onChange={this.handleChange}
                                placeholder="Renseigner la quantité"
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="expiry_date">Date de péremption</Label>
                              <Input
                                type="text"
                                id="expiry_date"
                                name="expiry_date"
                                value={this.state.activeItem.expiry}
                                onChange={this.handleChange}
                                placeholder="Renseigner la date de péremption"
                              />
                            </FormGroup>
                          </Form>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="success"
                            onClick={() => onSave(this.state.activeItem)}
                          >
                            Ajouter
                          </Button>
                        </ModalFooter>
                      </Modal>
                    );
          }
}
