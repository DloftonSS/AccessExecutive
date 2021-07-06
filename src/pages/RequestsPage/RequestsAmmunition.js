import React, { createRef, useEffect, useState } from "react";
import API from "../../utils/API";
import { Popup, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import { useSelector } from "react-redux";

function RequestsAmmunition() {
  const { currentUser, token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  //most likely needs to be firearmRequests
  const [allRequests, setRequests] = useState([]);
  const [displayAll, setDisplayAll] = useState(0);
  const [key, setKey] = useState(new Date());
  const tableRef = createRef();
  const [columns, setColumns] = useState([
    {
      title: "Item",
      field: "item",
      editable: "never",
    },
    {
      title: "Brand",
      field: "ammo_brand",
      editable: "never",
    },
    {
      title: "Quantity",
      field: "quantity",
      editable: "never",
    },
    {
      title: "Member First Name",
      field: "member_first",
      editable: "never",
      render: (rowData) => {
        return (
          <Link to={`/member/${rowData.memberID}`}>{rowData.member_first}</Link>
        );
      },
    },
    {
      title: "Member Last Name",
      field: "member_last",
      editable: "never",
      render: (rowData) => {
        return (
          <Link to={`/member/${rowData.memberID}`}>{rowData.member_last}</Link>
        );
      },
    },
    {
      title: "Status",
      field: "status",
      editable: "never",
      render: (rowData) => {
        if (rowData.status === "pending") {
          return (
            <Popup
              on="click"
              trigger={<Button>Pending</Button>}
              flowing
              hoverable
            >
              <Button
                id={rowData.id}
                color="yellow"
                onClick={(e) => changeStatus(e, "ordered")}
              >
                Ordered
              </Button>
              <Button
                id={rowData.id}
                color="orange"
                onClick={(e) => changeStatus(e, "backordered")}
              >
                Backordered
              </Button>
              <Button
                id={rowData.id}
                color="green"
                onClick={(e) => changeStatus(e, "fulfilled")}
              >
                Fulfilled
              </Button>
              <Button
                id={rowData.id}
                color="red"
                onClick={(e) => changeStatus(e, "cancelled")}
              >
                Canceled
              </Button>
            </Popup>
          );
        } else if (rowData.status === "ordered") {
          return (
            <Popup
              on="click"
              trigger={<Button color="yellow">Ordered</Button>}
              flowing
              hoverable
            >
              <Button
                id={rowData.id}
                color="orange"
                onClick={(e) => changeStatus(e, "backordered")}
              >
                Backordered
              </Button>
              <Button
                id={rowData.id}
                color="green"
                onClick={(e) => changeStatus(e, "fulfilled")}
              >
                Fulfilled
              </Button>
              <Button
                id={rowData.id}
                color="red"
                onClick={(e) => changeStatus(e, "cancelled")}
              >
                Canceled
              </Button>
            </Popup>
          );
        } else if (rowData.status === "backordered") {
          return (
            <Popup
              on="click"
              trigger={<Button color="red">Back Ordered</Button>}
              flowing
              hoverable
            >
              <Button
                id={rowData.id}
                color="yellow"
                onClick={(e) => changeStatus(e, "ordered")}
              >
                Ordered
              </Button>
              <Button
                id={rowData.id}
                color="green"
                onClick={(e) => changeStatus(e, "fulfilled")}
              >
                Fulfilled
              </Button>
              <Button
                id={rowData.id}
                color="red"
                onClick={(e) => changeStatus(e, "cancelled")}
              >
                Canceled
              </Button>
            </Popup>
          );
        } else if (rowData.status === "cancelled") {
          return (
            <Button id={rowData.id} color="red">
              Cancelled
            </Button>
          );
        } else {
          return (
            <Button id={rowData.id} color="green">
              Fullfilled
            </Button>
          );
        }
      },
    },
    {
      title: "Add/Edit Note",
      field: "note",
      render: (rowData) => {
        if (rowData.note) {
          return rowData.note;
        } else {
          return "Click To Add Note";
        }
      },
    },
    {
      title: "Date Requested",
      field: "createdAt",
      editable: "never",
      render: (rowData) => {
        let date = new Date(rowData.createdAt).toDateString();
        return date;
      },
    },
    {
      title: "Date Updated",
      field: "updatedAt",
      editable: "never",
      render: (rowData) => {
        let date = new Date(rowData.updatedAt).toDateString();
        return date;
      },
    },
  ]);

  const searchTerm = "ammunition";

  async function loadAllCategory() {
    const options = {
      headers: {
        token: token,
      },
    };

    const { data } = await API.loadAllCategory(searchTerm, options);
    setDisplayAll(data.length);
    setRequests(data);
    setLoading(false);
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
    loadAllCategory();
  }
  async function addRequestNote(note, rowData) {
    const options = {
      headers: {
        token: token,
      },
    };

    const data = {
      note: note,
      noteID: rowData.id,
      userID: rowData.userID,
    };
    setLoading(true);
    const newNote = await API.newRequestNote(data, options);
  }

  useEffect(() => {
    loadAllCategory();
  }, []);

  return (
    <MaterialTable
      key={key}
      columns={columns}
      title={"Ammunition"}
      data={allRequests}
      loading={loading}
      options={{ exportButton: true }}
      cellEditable={{
        onCellEditApproved: async (newValue, oldValue, rowData, columnDef) => {
          return new Promise((resolve, reject) => {
            addRequestNote(newValue, rowData);
            setTimeout(loadAllCategory, 500);
          }).then((resolve) => {
            resolve();
          });
        },
      }}
    />
  );
}

export default RequestsAmmunition;
