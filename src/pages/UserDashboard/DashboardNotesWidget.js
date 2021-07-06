import React, { useEffect, useState } from "react";
import { Icon, Card, Feed } from "semantic-ui-react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function DashboardNotes() {
  const [notes, setNotes] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const loadData = async () => {
    const options = {
      headers: {
        token: token,
      },
    };
    const notesData = await API.loadAllNotes(options);
    setNotes(notesData.data[0]);
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <Card fluid style={{ maxHeight: "350px" }}>
      <Card.Content>
        <Card.Header>Notes</Card.Header>
      </Card.Content>
      <Card.Content
        style={{
          overflowY: "scroll",
          scrollbarWidth: "1px",
          height: "100%",
        }}
      >
        <Feed>
          {notes.length > 0
            ? notes.map((note) => {
                let date = new Date(note.createdAt)
                  .toUTCString()
                  .split(" ")
                  .slice(0, 4)
                  .join(" ");
                return (
                  <Feed.Event key={note.id}>
                    <Feed.Label>
                      <Icon name="user circle" />
                    </Feed.Label>

                    <Feed.Content>
                      <Feed.Summary>
                        <Feed.User
                          style={{ cursor: "default", color: "#DB2828" }}
                        >
                          {note.first_name + " " + note.last_name}
                        </Feed.User>
                        <Feed.Date>{date}</Feed.Date>
                      </Feed.Summary>
                      <Feed.Meta>
                        <Feed.User as={Link} to={`/member/${note.memberID}`}>
                          Executive:{" "}
                          {note.member_first + " " + note.member_last}
                        </Feed.User>
                      </Feed.Meta>
                      <Feed.Extra>{note.note}</Feed.Extra>
                    </Feed.Content>
                  </Feed.Event>
                );
              })
            : "No Notes"}
        </Feed>
      </Card.Content>
      {/* <Input
        style={{ margin: "1rem" }}
        icon="sticky note outline"
        action={{
          icon: "add",
        }}
        iconPosition="left"
        placeholder="Add Note..."
      /> */}
    </Card>
  );
}

export default DashboardNotes;
