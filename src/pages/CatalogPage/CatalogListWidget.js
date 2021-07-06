import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Image, Dimmer, Loader } from "semantic-ui-react";
import API from "../../utils/API";
import { useSelector } from "react-redux";

function CatalogListWidget(props) {
  const { reload, searchTerm, allItems, loading } = props;
  const { token } = useSelector((state) => state.auth);
  const [newloading, setLoading] = useState(false);

  const handleDelete = async (params, id) => {
    setLoading(true);
    const options = {
      headers: {
        token: token,
      },
    };
    console.log(params.target);
    console.log(id);
    await API.deleteCatalogItem(id, options);

    props.loadCatalog();
    setLoading(false);
  };

  const columns = [
    {
      field: "id",
      title: "ID",
    },
    {
      field: "name",
      title: "Item",
    },
    {
      field: "description",
      title: "Description",
    },
    {
      field: "quantity",
      title: "Quantity",
    },
    {
      field: "price",
      title: "Price",
      render: (params) => {
        const price = params.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const newPrice = `$${price}`;
        return newPrice;
      },
    },
    {
      field: "viewEdit",
      title: "View / Edit",
      render: (params) => (
        <div>
          <Link to={"/catalog/edit/" + params.id}>
            <Button variant="contained" size="small" style={{ marginLeft: 16 }}>
              Edit Item
            </Button>
          </Link>

          <Button
            key={params.id}
            id={params.id}
            variant="contained"
            size="small"
            color="secondary"
            style={{ marginLeft: 16 }}
            onClick={(e) => handleDelete(e, params.id)}
          >
            Delete Item
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {loading || newloading ? (
        <Dimmer active>
          <Loader size="massive">Loading</Loader>
        </Dimmer>
      ) : (
        <MaterialTable
          style={{ maxHeight: "78vh", overflowY: "scroll" }}
          data={allItems}
          columns={columns}
          minRows={20}
          title={"Catalog"}
          rowsPerPageOptions={[20, 40, 60]}
          options={{
            exportButton: true,
            toolbar: true,
          }}
          detailPanel={[
            {
              render: (rowData) => {
                return rowData.images.map((image) => {
                  return (
                    <Image
                      style={{ display: "inline" }}
                      key={image.id}
                      size="medium"
                      src={image.url}
                    />
                  );
                });
              },
            },
          ]}
        />
      )}
    </div>
  );
}

export default CatalogListWidget;
