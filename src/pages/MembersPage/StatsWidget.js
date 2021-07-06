import React, { useState, useEffect } from "react";
import { Card, List, Loader } from "semantic-ui-react";
import StatsAPI from "../../utils/StatsAPI";
import { useSelector } from "react-redux";

function StatsWidget() {
  const { token } = useSelector((state) => state.auth);
  const [memberStats, setMemberStats] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    const options = {
      headers: {
        token: token,
      },
    };

    const { data } = await StatsAPI.getMemberStats(options);
    setMemberStats(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Card style={{ height: "7vh", width: "100%" }}>
        <List
          horizontal
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "5px 100px",
            width: "80%",
            margin: "0 auto",
          }}
        >
          <List.Item style={{ textAlign: "center" }}>
            {loading ? (
              <>
                <List.Header>Total Members</List.Header>
                <Loader active inline="centered" />
              </>
            ) : (
              <>
                <List.Header>Total Members</List.Header>
                {memberStats.totalMembers}
              </>
            )}
          </List.Item>
          <List.Item style={{ textAlign: "center" }}>
            {loading ? (
              <>
                <List.Header>Active Members</List.Header>
                <Loader active inline="centered" />
              </>
            ) : (
              <>
                <List.Header>Active Members</List.Header>
                {memberStats.activeMembers}
              </>
            )}
          </List.Item>
          <List.Item style={{ textAlign: "center" }}>
            {loading ? (
              <>
                <List.Header>Expired Members</List.Header>
                <Loader active inline="centered" />
              </>
            ) : (
              <>
                <List.Header>Expired Members</List.Header>
                {memberStats.expiredMembers}
              </>
            )}
          </List.Item>
        </List>
      </Card>
    </div>
  );
}

export default StatsWidget;
