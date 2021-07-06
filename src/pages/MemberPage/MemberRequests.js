import React, { useEffect, useState } from "react";
import SettingsAPI from "../../utils/SettingsAPI";
import API from "../../utils/API";
import {
  Form,
  Card,
  Table,
  Button,
  Message,
  Popup,
  Dropdown,
} from "semantic-ui-react";
import { useSelector } from "react-redux";

function MemberRequests(props) {
  const { currentUser, token } = useSelector((state) => state.auth);
  const id = props.id;
  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [gunBrand, setGunBrand] = useState("");
  const [ammoType, setAmmoType] = useState("");
  const [ammoBrand, setAmmoBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [requests, setRequests] = useState([]);
  const [ammoTypes, setAmmoTypes] = useState([]);
  const [ammoBrands, setAmmoBrands] = useState([]);
  const [gunBrands, setGunBrands] = useState([]);

  const firstDropdown = [
    { key: 1, text: "Firearms", value: "firearms" },
    { key: 2, text: "Ammunition", value: "ammunition" },
    { key: 3, text: "Suppressors", value: "suppressors" },
    { key: 4, text: "Accessories", value: "accessories" },
    { key: 5, text: "Scopes", value: "scopes" },
  ];

  const DropFill = () => {
    if (category == "ammunition") {
      return (
        <div>
          <Dropdown
            name="ammo"
            key="ammunitionkey"
            options={ammoTypes}
            placeholder="Ammo"
            value={ammoType}
            selection
            style={{ marginBottom: "10px" }}
            onChange={handleRequest}
          />

          <Dropdown
            name="ammo_brand"
            key="ammunitionBrand"
            options={ammoBrands}
            value={ammoBrand}
            placeholder="Brand"
            selection
            style={{ marginBottom: "10px" }}
            onChange={handleRequest}
          />

          <Form.Input
            name="quantity"
            key="ammunitionQuantity"
            placeholder="Quantity"
            value={quantity}
            selection
            style={{ marginBottom: "10px" }}
            onChange={handleInput}
          />
        </div>
      );
    }
    if (category == "firearms") {
      return (
        <div>
          <Dropdown
            name="gun_brand"
            key="gunBrand"
            options={gunBrands}
            value={gunBrand}
            selection
            placeholder="Brand"
            style={{ marginBottom: "10px" }}
            onChange={handleRequest}
          />
          <Form.Input
            name="item"
            key="firearmItem"
            placeholder="Model/Name"
            selection
            value={item}
            style={{ marginBottom: "10px" }}
            onChange={(e) => handleInput(e)}
          />
          <Form.Input
            key="firearmQuantity"
            name="quantity"
            value={quantity}
            placeholder="Quantity"
            selection
            style={{ marginBottom: "10px" }}
            onChange={handleInput}
          />
        </div>
      );
    }
    if (category == "suppressors") {
      return (
        <div>
          <Form.Input
            key="suppressorItem"
            name="item"
            value={item}
            placeholder="Model/Name"
            selection
            style={{ marginBottom: "10px" }}
            onChange={handleInput}
          />
          <Form.Input
            key="suppressorQuantity"
            name="quantity"
            value={quantity}
            placeholder="Quantity"
            selection
            style={{ marginBottom: "10px" }}
            onChange={handleInput}
          />
        </div>
      );
    }
    if (category == "accessories") {
      return (
        <div>
          <Form.Input
            key="accessoriesItem"
            name="item"
            value={item}
            placeholder="Model/Name"
            selection
            style={{ marginBottom: "10px" }}
            onChange={handleInput}
          />
          <Form.Input
            key="accessoriesQuantity"
            name="quantity"
            value={quantity}
            placeholder="Quantity"
            selection
            style={{ marginBottom: "10px" }}
            onChange={handleInput}
          />
        </div>
      );
    }
    if (category == "scopes") {
      return (
        <div>
          <Form.Input
            name="item"
            key="scopesItem"
            value={item}
            placeholder="Model/Name"
            selection
            style={{ marginBottom: "10px" }}
            onChange={handleInput}
          />
          <Form.Input
            name="quantity"
            key="scopesQuantity"
            value={quantity}
            placeholder="Quantity"
            selection
            style={{ marginBottom: "10px" }}
            onChange={handleInput}
          />
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  async function getDetails() {
    const options = {
      headers: {
        token: token,
      },
    };
    const requests = await API.loadMemberRequests(id, options);

    setRequests(requests.data);
    const ammo_types = await SettingsAPI.getAmmoTypes(options);
    let tempArray = [];
    ammo_types.data.forEach((ammo) => {
      let item = {
        key: ammo.id,
        text: ammo.category_name,
        value: ammo.category_name,
      };
      tempArray.push(item);
    });
    setAmmoTypes(tempArray);
    const ammo_brands = await SettingsAPI.getAmmoBrands(options);
    let tempArray2 = [];
    ammo_brands.data.forEach((ammo) => {
      let item = {
        key: ammo.id,
        text: ammo.category_name,
        value: ammo.category_name,
      };
      tempArray2.push(item);
    });
    setAmmoBrands(tempArray2);
    const gun_brands = await SettingsAPI.getFirearmBrands(options);
    let tempArray3 = [];
    gun_brands.data.forEach((ammo) => {
      let item = {
        key: ammo.id,
        text: ammo.category_name,
        value: ammo.category_name,
      };
      tempArray3.push(item);
    });
    setGunBrands(tempArray3);
  }

  async function changeStatus(e, status) {
    const options = {
      headers: {
        token: token,
      },
    };

    const requestID = e.target.id;
    const updateStatus = {
      status,
      changedBy: currentUser.id,
    };
    const updatedRequest = await API.updateRequest(
      requestID,
      updateStatus,
      options
    );
    getDetails();
  }

  const handleSubmit = async (e) => {
    setErrorMessage("");
    const options = {
      headers: {
        token: token,
      },
    };
    if (category == "firearms") {
      const request = {
        category,
        gunBrand,
        item,
        quantity,
        memberID: id,
        userID: currentUser.id,
      };

      const submit = await API.createNewRequest(request, options);
    } else if (category == "ammunition") {
      const request = {
        category,
        ammoType,
        ammoBrand,
        quantity,
        memberID: id,
        userID: currentUser.id,
      };
      const submit = await API.createNewRequest(request, options);
    } else {
      const request = {
        category,
        item,
        quantity,
        memberID: id,
        userID: currentUser.id,
      };
      const submit = await API.createNewRequest(request, options);
    }

    getDetails();
    setCategory("");
    setItem("");
    setQuantity("");
    setAmmoBrand("");
    setAmmoType("");
    setGunBrand("");
  };
  const handleInput = async (e) => {
    if (e.target.name) {
      if (e.target.name === "item") {
        setItem(e.target.value);
      } else if (e.target.name === "quantity") {
        setQuantity(e.target.value);
      } else {
        setQuantity(e.target.value);
      }
    }
  };

  const handleRequest = async (e, result) => {
    if (result.name === "category") {
      setItem("");
      setQuantity("");
      setAmmoBrand("");
      setAmmoType("");
      setGunBrand("");
      setCategory(result.value);
    } else if (result.name == "ammo") {
      setAmmoType(result.value);
    } else if (result.name === "gun_brand") {
      setGunBrand(result.value);
    } else if (result.name === "ammo_brand") {
      setAmmoBrand(result.value);
    }
  };
  const HandleError = () => {
    if (errorMessage) {
      return <Message negative>{errorMessage}</Message>;
    } else {
      return <div></div>;
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", padding: "0 1rem ", alignItems: "top" }}>
        <Card style={{ height: "350px", marginRight: "10px", width: "100%" }}>
          <Card.Content>
            <Card.Header>Requests</Card.Header>
          </Card.Content>
          <Card.Content style={{ overflowY: "scroll", height: "100%" }}>
            <Table celled striped color="red">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Category</Table.HeaderCell>
                  <Table.HeaderCell>Item</Table.HeaderCell>
                  <Table.HeaderCell>Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Requested By</Table.HeaderCell>
                  <Table.HeaderCell>Date Updated</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {requests.length > 0 ? (
                  requests.map((request) => {
                    if (
                      request.status === "pending;" ||
                      request.status === "pending"
                    ) {
                      let date = new Date(request.updatedAt).toDateString();
                      return (
                        <Table.Row key={request.id}>
                          <Table.Cell>{request.category}</Table.Cell>
                          <Table.Cell>{request.item}</Table.Cell>
                          <Table.Cell>{request.quantity}</Table.Cell>
                          <Table.Cell>{request.first_name}</Table.Cell>
                          <Table.Cell>{date}</Table.Cell>
                          <Table.Cell>
                            <Popup
                              on="click"
                              trigger={<Button>Pending</Button>}
                              flowing
                              hoverable
                            >
                              <Button
                                id={request.id}
                                color="yellow"
                                onClick={(e) => changeStatus(e, "ordered")}
                              >
                                Ordered
                              </Button>
                              <Button
                                id={request.id}
                                color="orange"
                                onClick={(e) => changeStatus(e, "backordered")}
                              >
                                Backordered
                              </Button>
                              <Button
                                id={request.id}
                                color="green"
                                onClick={(e) => changeStatus(e, "fulfilled")}
                              >
                                Fulfilled
                              </Button>
                              <Button
                                id={request.id}
                                color="red"
                                onClick={(e) => changeStatus(e, "cancelled")}
                              >
                                Canceled
                              </Button>
                            </Popup>
                          </Table.Cell>
                        </Table.Row>
                      );
                    } else if (request.status === "ordered") {
                      let date = new Date(request.updatedAt).toDateString();
                      return (
                        <Table.Row key={request.id}>
                          <Table.Cell>{request.category}</Table.Cell>
                          <Table.Cell>{request.item}</Table.Cell>
                          <Table.Cell>{request.quantity}</Table.Cell>
                          <Table.Cell>{request.first_name}</Table.Cell>
                          <Table.Cell>{date}</Table.Cell>
                          <Table.Cell>
                            <Popup
                              on="click"
                              trigger={<Button color="yellow">Ordered</Button>}
                              flowing
                              hoverable
                            >
                              <Button
                                id={request.id}
                                color="orange"
                                onClick={(e) => changeStatus(e, "backordered")}
                              >
                                Backordered
                              </Button>
                              <Button
                                id={request.id}
                                color="green"
                                onClick={(e) => changeStatus(e, "fulfilled")}
                              >
                                Fulfilled
                              </Button>
                              <Button
                                id={request.id}
                                color="red"
                                onClick={(e) => changeStatus(e, "cancelled")}
                              >
                                Canceled
                              </Button>
                            </Popup>
                          </Table.Cell>
                        </Table.Row>
                      );
                    } else if (request.status === "backordered") {
                      let date = new Date(request.updatedAt).toDateString();
                      return (
                        <Table.Row key={request.id}>
                          <Table.Cell>{request.category}</Table.Cell>
                          <Table.Cell>{request.item}</Table.Cell>
                          <Table.Cell>{request.quantity}</Table.Cell>
                          <Table.Cell>{request.first_name}</Table.Cell>
                          <Table.Cell>{date}</Table.Cell>
                          <Table.Cell>
                            <Popup
                              on="click"
                              trigger={
                                <Button color="red">Back Ordered</Button>
                              }
                              flowing
                              hoverable
                            >
                              <Button
                                id={request.id}
                                color="yellow"
                                onClick={(e) => changeStatus(e, "ordered")}
                              >
                                Ordered
                              </Button>
                              <Button
                                id={request.id}
                                color="green"
                                onClick={(e) => changeStatus(e, "fulfilled")}
                              >
                                Fulfilled
                              </Button>
                              <Button
                                id={request.id}
                                color="red"
                                onClick={(e) => changeStatus(e, "cancelled")}
                              >
                                Canceled
                              </Button>
                            </Popup>
                          </Table.Cell>
                        </Table.Row>
                      );
                    } else if (request.status === "cancelled") {
                      let date = new Date(request.updatedAt).toDateString();
                      return (
                        <Table.Row key={request.id}>
                          <Table.Cell>{request.category}</Table.Cell>
                          <Table.Cell>{request.item}</Table.Cell>
                          <Table.Cell>{request.quantity}</Table.Cell>
                          <Table.Cell>{request.first_name}</Table.Cell>
                          <Table.Cell>{date}</Table.Cell>
                          <Table.Cell>
                            <Button color="red">Cancelled</Button>
                          </Table.Cell>
                        </Table.Row>
                      );
                    } else {
                      let date = new Date(request.updatedAt).toDateString();
                      return (
                        <Table.Row key={request.id}>
                          <Table.Cell>{request.category}</Table.Cell>
                          <Table.Cell>{request.item}</Table.Cell>
                          <Table.Cell>{request.quantity}</Table.Cell>
                          <Table.Cell>{request.first_name}</Table.Cell>
                          <Table.Cell>{date}</Table.Cell>
                          <Table.Cell>
                            <Button color="green">Fullfilled</Button>
                          </Table.Cell>
                        </Table.Row>
                      );
                    }
                  })
                ) : (
                  <Table.Row>
                    <Table.Cell>No Requests</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Card.Header>New Request</Card.Header>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <HandleError />
              <Form.Field>
                <Form.Select
                  options={firstDropdown}
                  label="Category"
                  placeholder="Firearms"
                  name="category"
                  value={category}
                  onChange={handleRequest}
                />

                {DropFill()}
              </Form.Field>
              <Button color="red">Add Request</Button>
            </Form>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}

export default MemberRequests;
