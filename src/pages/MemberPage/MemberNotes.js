import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import { Input, Icon, Card, Feed } from "semantic-ui-react";
import { useSelector } from "react-redux";

function MemberNotes(props) {
  const { currentUser, token } = useSelector((state) => state.auth);
  const [memberNotes, setMembernotes] = useState([]);
  const [note, setNote] = useState("");
  const id = props.id;

  async function getDetails() {
    const query = {
      id,
      userID: currentUser.id,
    };

    const options = {
      headers: {
        token: token,
      },
    };

    const notes = await API.loadMemberNotes(query, options);

    setMembernotes(notes.data);
  }
  const handleClick = async () => {
    const options = {
      headers: {
        token: token,
      },
    };

    const submitNote = await API.makeNewNote(
      {
        note,
        userID: currentUser.id,
        memberID: id,
      },
      options
    );

    setNote("");
    getDetails();
  };

  const deleteNote = async (event) => {
    const query = {
      id: props.id,
      userID: currentUser.id,
    };
    const { id } = event.target;

    const options = {
      headers: {
        token: token,
      },
    };

    const deletedNote = await API.deleteNote(id, options);
    const notes = await API.loadMemberNotes(query, options);

    getDetails();
  };

  const handleChange = (event) => {
    const noteText = event.target.value;
    setNote(noteText);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>Notes</Card.Header>
      </Card.Content>
      <Card.Content style={{ overflowY: "scroll", height: "350px" }}>
        <Feed>
          {memberNotes.length > 0
            ? memberNotes.map((note) => {
                let date = new Date(note.createdAt)
                  .toUTCString()
                  .split(" ")
                  .slice(0, 4)
                  .join(" ");
                if (note.userID == currentUser.id) {
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
                        <Feed.Extra>{note.note}</Feed.Extra>
                      </Feed.Content>

                      <Feed.Meta user={note.first_name}>
                        <Feed.Like>
                          <Icon
                            name="trash alternate outline"
                            id={note.id}
                            onClick={(event) => deleteNote(event)}
                          />
                        </Feed.Like>
                      </Feed.Meta>
                    </Feed.Event>
                  );
                } else {
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
                        <Feed.Extra>{note.note}</Feed.Extra>
                      </Feed.Content>
                    </Feed.Event>
                  );
                }
              })
            : "No Notes Created"}
        </Feed>
      </Card.Content>
      <Input
        style={{ margin: "1rem" }}
        icon="sticky note outline"
        action={{
          icon: "add",
          onClick: () => handleClick(),
        }}
        iconPosition="left"
        placeholder="Add Note..."
        value={note}
        onChange={(event) => handleChange(event)}
      />
    </Card>
  );
}

export default MemberNotes;
