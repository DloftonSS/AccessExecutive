import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import Button from "@material-ui/core/Button";
import { Icon, Popup, Dimmer, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import HeaderComponent from "../../components/HeaderComponent";
import StatsWidget from "./StatsWidget";
import { useSelector } from "react-redux";

export const MembersPage = () => {
  const [allMembers, setMembers] = useState({});
  const [loading, setLoading] = useState(true);
  const [backup, setBackup] = useState({});
  const [displayAll, setDisplayAll] = useState(0);
  const { token } = useSelector((state) => state.auth);

  async function loadMembers() {
    const options = {
      headers: {
        token: token,
      },
    };
    const { data } = await API.getMembers(options);
    setMembers(data);
    setLoading(false);
    setBackup(data);
    setDisplayAll(data.length);
  }

  function addDays(theDate, days) {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
  }

  useEffect(() => {
    loadMembers();
  }, []);

  const columns = [
    {
      field: "id",
      title: "ID",
    },
    {
      field: "first_name",
      title: "First Name",
      cellClassName: "testing",

      render: (rowData) => {
        return <Link to={`/member/${rowData.id}`}>{rowData.first_name}</Link>;
      },
    },
    {
      field: "last_name",
      title: "Last Name",

      render: (rowData) => {
        return <Link to={`/member/${rowData.id}`}>{rowData.last_name}</Link>;
      },
    },
    {
      field: "email",
      title: "E-mail Address",
    },
    {
      field: "date_joined",
      title: "Date Joined",

      cellClassName: "testing",
      render: (rowData) => {
        let date = new Date(rowData.date_joined).toDateString();
        return date;
      },
    },
    {
      field: "expiration_date",
      title: "Expiration Date",
      type: "date",
      render: (rowData) => {
        let date = new Date(rowData.expiration_date).toDateString();
        let expDate = new Date(rowData.expiration_date);
        let testdate = new Date();
        var sevenDays = addDays(new Date(), 30);
        if (expDate <= testdate) {
          return (
            <p style={{ backgroundColor: "red", color: "white" }}>{date}</p>
          );
        } else if ((expDate <= sevenDays) & (expDate > testdate)) {
          return (
            <p style={{ backgroundColor: "yellow", color: "black" }}>{date}</p>
          );
        } else {
          return date;
        }
      },
    },
    {
      field: "card_status",
      title: "Card Status",
      render: (rowData) => {
        if (rowData.card_status == "YES") {
          return (
            <>
              <Popup
                on="click"
                trigger={
                  <Icon
                    name="id card outline"
                    color="green"
                    size="large"
                    style={{ textAlign: "center" }}
                  />
                }
                flowing
                hoverable
              >
                <Button>Remove Card</Button>
              </Popup>
            </>
          );
        } else {
          return (
            <>
              <Popup
                on="click"
                trigger={
                  <Icon
                    name="id card outline"
                    color="red"
                    size="large"
                    style={{ margin: "0 auto" }}
                  />
                }
                flowing
                hoverable
              >
                <Button>Issue Card</Button>
              </Popup>
            </>
          );
        }
      },

      headerAlign: "center",
    },
    {
      field: "preferred_store",
      title: "Preferred Store",
      width: 100,
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <div>
        <HeaderComponent title="Members" icon="users" />
      </div>
      <div
        style={{
          maxHeight: "100%",
          width: "100%",
          backgroundColor: "white",
          boxShadow: "0px 5px 5px grey",
        }}
      >
        <StatsWidget />
        {loading ? (
          <Dimmer active>
            <Loader size="massive">Loading</Loader>
          </Dimmer>
        ) : (
          <MaterialTable
            style={{ maxHeight: "78vh", overflowY: "scroll" }}
            minRows={25}
            columns={columns}
            title={"All Members"}
            data={allMembers}
            loading={loading}
            options={{
              exportButton: true,
              pageSize: 25,
              pageSizeOptions: [
                25,
                50,
                Math.floor(displayAll / 4),
                Math.floor(displayAll / 2),
                displayAll,
              ],
              toolbar: true,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MembersPage;
