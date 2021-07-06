import React from "react";
import { Header, Message, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import MyAccount from "./MyAccount";

function HeaderComponent(props) {
  let history = useHistory();

  return (
    <div>
      <Message className="message-container" secondary="true">
        <MyAccount />
        <Header size="huge">
          <Icon name={props.icon} /> {props.title}
        </Header>
        {props.link ? (
          <Icon
            size="big"
            name="arrow alternate circle left outline"
            color="red"
            onClick={() => history.goBack()}
          />
        ) : (
          ""
        )}
      </Message>
    </div>
  );
}

export default HeaderComponent;
