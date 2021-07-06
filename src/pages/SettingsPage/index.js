import React, { useState, useEffect } from "react";
import HeaderComponent from "../../components/HeaderComponent";
import { Card, Form, Message, List, Grid, Icon } from "semantic-ui-react";
import SettingsAPI from "../../utils/SettingsAPI";
import { useSelector } from "react-redux";

function Settings() {
  const [newName, setNewName] = useState("");
  const [category, setCategory] = useState("");
  const [errMessage, setErrMessage] = useState(false);
  const [ammoTypes, setAmmoTypes] = useState({});
  const [ammoBrands, setAmmoBrands] = useState([]);
  const [firearmBrands, setFirearmBrands] = useState([]);
  const { token } = useSelector((state) => state.auth);

  function handleChange(event) {
    setNewName(event.target.value);
  }

  function handleDrop(event, result) {
    setCategory(result.value);
  }

  async function handleSubmit() {
    const options = {
      headers: {
        token: token,
      },
    };
    if (category == "" || newName == "") {
      setErrMessage(true);
    } else {
      const data = {
        category,
        category_name: newName,
      };
      await SettingsAPI.newCategory(data, options);
      setNewName("");
      loadData();
    }
  }

  function handleDismiss() {
    setErrMessage(false);
  }

  async function handleDelete(e, result) {
    const options = {
      headers: {
        token: token,
      },
    };
    console.log(e.target.id);
    const id = e.target.id;
    const item = await SettingsAPI.deleteCategory(id, options);
    loadData();
  }

  const ErrorMessage = () => {
    if (errMessage) {
      return (
        <Message negative onDismiss={handleDismiss}>
          <Message.Header>Something Went Wrong</Message.Header>
          <p>Please completely fill out all fields</p>
        </Message>
      );
    } else {
      return <div></div>;
    }
  };

  async function loadData() {
    const options = {
      headers: {
        token: token,
      },
    };
    const { data } = await SettingsAPI.getAmmoTypes(options);
    setAmmoTypes(data);
    const brands = await SettingsAPI.getAmmoBrands(options);
    setAmmoBrands(brands.data);
    const arms = await SettingsAPI.getFirearmBrands(options);
    setFirearmBrands(arms.data);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ width: "100%", overflowY: "scroll" }}>
      <HeaderComponent title={"Settings"} icon={"cog"} link={"yes"} />
      <div style={{ display: "flex", alignItems: "top" }}>
        <Card fluid style={{ overflowY: "scroll" }}>
          <Card.Content>
            <Card.Header>Brand / Types</Card.Header>
            <Grid columns={3} divided>
              <Grid.Column>
                <h4>Ammo Types</h4>
                <List>
                  {ammoTypes.length > 0 ? (
                    ammoTypes.map((item) => {
                      return (
                        <List.Item
                          key={item.id}
                          style={{
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          {item.category_name}{" "}
                          <Icon
                            name="cancel"
                            color="red"
                            style={{ cursor: "pointer" }}
                            id={item.id}
                            onClick={handleDelete}
                          />
                        </List.Item>
                      );
                    })
                  ) : (
                    <List.Item>Nothing</List.Item>
                  )}
                </List>
              </Grid.Column>
              <Grid.Column>
                <h4>Ammo Brands</h4>
                <List>
                  {ammoBrands.length > 0 ? (
                    ammoBrands.map((item) => {
                      return (
                        <List.Item key={item.id}>
                          {item.category_name}{" "}
                          <Icon
                            name="cancel"
                            color="red"
                            style={{ cursor: "pointer" }}
                            id={item.id}
                            onClick={handleDelete}
                          />
                        </List.Item>
                      );
                    })
                  ) : (
                    <List.Item>Nothing</List.Item>
                  )}
                </List>
              </Grid.Column>
              <Grid.Column>
                <h4>Firearm Brands</h4>
                <List>
                  {firearmBrands.length > 0 ? (
                    firearmBrands.map((item) => {
                      return (
                        <List.Item key={item.id}>
                          {item.category_name}{" "}
                          <Icon
                            name="cancel"
                            color="red"
                            style={{ cursor: "pointer" }}
                            id={item.id}
                            onClick={handleDelete}
                          />
                        </List.Item>
                      );
                    })
                  ) : (
                    <List.Item>Nothing</List.Item>
                  )}
                </List>
              </Grid.Column>
            </Grid>
          </Card.Content>
        </Card>
        <Card fluid style={{ marginLeft: "5px" }}>
          <Card.Content>
            <Card.Header>Create New Brand or Type</Card.Header>
            <ErrorMessage />
            <Form>
              <Form.Select
                label="Category"
                placeholder="Select Category..."
                name="category"
                id="category"
                options={[
                  { key: "1", text: "Ammo Type", value: "ammo_type" },
                  { key: "2", text: "Ammo Brand", value: "ammo_brand" },
                  { key: "3", text: "Firearm Brand", value: "firearm_brand" },
                ]}
                onChange={handleDrop}
              />
              <Form.Input
                label="Type / Brand Name"
                placeholder="Sig Sauer"
                name="name"
                id="name"
                onChange={handleChange}
                value={newName}
              />
              <Form.Button color="red" onClick={handleSubmit}>
                Create
              </Form.Button>
            </Form>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}

export default Settings;
