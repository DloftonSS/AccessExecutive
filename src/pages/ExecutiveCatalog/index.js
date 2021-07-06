import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Image } from "semantic-ui-react";
import { loadExec } from "../../actions/authActions";
import CatalogExecutiveDashWidget from "./CatalogExecutiveDashWidget";
import { useHistory } from "react-router-dom";
// import CatalogListWidget from "../CatalogPage/CatalogListWidget";
// import API from "../../utils/API";
import "./style.css";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "../../components/CheckoutForm";
// import StripeAPI from "../../utils/StripeAPI";
// const stripePromise = StripeAPI.getPublicKey().then((key) =>
//   loadStripe(key.data)
// );

export const ExecutiveCatalog = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadExec());
  }, []);

  let history = useHistory();

  return (
    <div
      fluid
      style={{
        width: "100%",
        marginRight: "10px",
        backgroundColor: "black",
        height: "100vh",
      }}
    >
      <Grid>
        <Grid.Column mobile={16} tablet={8} computer={4}>
          <h4 className="Hey" onClick={() => history.goBack()}>
            Catalog
          </h4>
          {/* <div className="executive_container">
            <div className="executive_btn_2" onClick={() => history.goBack()}>
              <h4 className="requests_btn_title">Catalog</h4>
            </div>
          </div> */}
          <CatalogExecutiveDashWidget />
        </Grid.Column>
      </Grid>

      {/* <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements> */}
    </div>
  );
};

export default ExecutiveCatalog;
