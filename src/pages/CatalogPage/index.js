import React, { useState, useEffect } from "react";
import CatalogListWidget from "./CatalogListWidget";
import AddItem from "./AddItem";
import MyAccount from "../../components/MyAccount";
import { Header, Message, Icon, Input } from "semantic-ui-react";
import API from "../../utils/API";
import { useSelector } from "react-redux";

function CatalogPage(props) {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const [allItems, setAllItems] = useState([]);

  const loadCatalog = async () => {
    const options = {
      headers: {
        token: token,
      },
    };
    const { data } = await API.loadCatalog(options);
    setAllItems(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCatalog();
  }, []);

  return (
    <div style={{ width: "100%", overflowY: "scroll" }}>
      <div>
        <Message className="message-container" secondary="true">
          <MyAccount />
          <Header size="huge">
            {" "}
            <Icon name="list" /> Catalog{" "}
          </Header>
          <div
            style={{ display: "flex", float: "right", lineHeight: "2.8rem" }}
          >
            <AddItem />
          </div>
        </Message>
      </div>
      <div
        style={{
          height: "85%",
          width: "100%",
          backgroundColor: "white",
          boxShadow: "0px 5px 5px grey",
        }}
      >
        <CatalogListWidget
          allItems={allItems}
          loading={loading}
          loadCatalog={loadCatalog}
        />
      </div>
    </div>
  );
}

export default CatalogPage;
