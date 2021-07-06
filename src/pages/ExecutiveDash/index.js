import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Image, Icon } from "semantic-ui-react";
import { loadExec } from "../../actions/authActions";
import "./styling/executiveDash.css";
import Beard from "./images/evilbeard.png";
import Cool from "./images/coolgun.jpg";
import gunone from "./images/gunone.jpg";
import guntwo from "./images/guntwo.png";
import gunthree from "./images/gunthree.jpg";
import KrissVector from "./images/gunghost.png";

// import CatalogExecutiveDashWidget from "./CatalogExecutiveDashWidget";
// import CatalogListWidget from "../CatalogPage/CatalogListWidget";
// import API from "../../utils/API";
// import "./style.css";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "../../components/CheckoutForm";
// import StripeAPI from "../../utils/StripeAPI";
// const stripePromise = StripeAPI.getPublicKey().then((key) =>
//   loadStripe(key.data)
// );

export const ExecutiveDash = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadExec());
  }, []);

  return (
    <div style={{ backgroundColor: "black" }}>
      <div className="execMobile">
        <h3 className="mobileHeader">
          <span style={{ color: "red" }}>EXCLUSIVE</span> FIREARMS PROGRAM
        </h3>
        <Grid>
          {/* <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Image src={KrissVector} className="coolgun" size="large" />
            </Grid.Column>
          </Grid.Row> */}
          <Grid.Row>
            <Grid.Column width={16} style={{ left: "10%", paddingTop: "10%" }}>
              <h2>Directory</h2>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="benefitsBoxesMargin positioningTop">
            <Grid.Column width={6} className="benefitsBoxes">
              <Link to="/ExecutiveAccount" className="links">
                My Account
                <Icon
                  style={{ marginLeft: "20%" }}
                  name="arrow circle right"
                ></Icon>
              </Link>
            </Grid.Column>
            <Grid.Column width={6} className="benefitsBoxes">
              <Link to="/ExecutiveCatalog" className="links">
                Catalog
                <Icon
                  style={{ marginLeft: "20%" }}
                  name="arrow circle right"
                ></Icon>
              </Link>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="benefitsBoxesMargin positioningBottom">
            <Grid.Column width={6} className="benefitsBoxes">
              <Link to="/Executiverequests" className="links">
                Requests
                <Icon
                  style={{ marginLeft: "20%" }}
                  name="arrow circle right"
                ></Icon>
              </Link>
            </Grid.Column>
            <Grid.Column width={6} className="benefitsBoxes">
              <Link to="" className="links">
                Events
                <Icon
                  style={{ marginLeft: "20%" }}
                  name="arrow circle right"
                ></Icon>
              </Link>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} style={{ left: "10%" }}>
              <h2>Gallery</h2>
            </Grid.Column>
          </Grid.Row>
          <div className="scrollmenu">
            <Image className="scrollingImages" src={gunone} />
            <Image className="scrollingImages" src={guntwo} />
            <Image className="scrollingImages" src={gunthree} />
            <Image className="scrollingImages" src={guntwo} />
            <Image className="scrollingImages" src={gunone} />
            <Image className="scrollingImages" src={gunthree} />
            <Image className="scrollingImages" src={guntwo} />
            <Image className="scrollingImages" src={gunone} />
            <Image className="scrollingImages" src={guntwo} />
            <Image className="scrollingImages" src={gunthree} />
            <Image className="scrollingImages" src={guntwo} />
            <Image className="scrollingImages" src={gunone} />
          </div>
          <Grid.Row>
            <Grid.Column width={16} style={{ left: "10%", paddingTop: "10%" }}>
              <h2>Questions?</h2>
            </Grid.Column>
          </Grid.Row>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            {/* <Image src={Beard} className="evilBeardImage" size="large" /> */}
            <div>
              <section style={{ margin: "1rem" }}>
                <p className="Questions">
                  Speak to one of our Shoot Straight managers or contact an
                  Excecutive Access Club program representative to find out more
                  and get any questions you may have asnwered. We can help you
                  decide if the program is right for you and expand on the
                  various benefits available to you, now that you have joined.
                </p>
              </section>
            </div>
            <footer>
              <p className="address">
                Shoot Straight - Executive Access Club ©2021
              </p>
              <p className="address">Shoot Straight Inc. ©2021 Headquarters</p>
              <p className="address">1349 South Orange Blossom Trail</p>
            </footer>
            <div></div>
          </Grid.Column>
        </Grid>

        {/* <Grid>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <div className="executive_container">
              <Link to="/ExecutiveCatalog">
                <button className="executive_btn_2">
                  <h4 className="requests_btn_title">Catalog</h4>
                </button>
              </Link>
              <Link to="/ExecutiveAccount">
                <button className="executive_btn_2">
                  <h4 className="requests_btn_title">Account</h4>
                </button>
              </Link>
              <Link to="/Executiverequests">
                <button className="executive_btn_2">
                  <h4 className="requests_btn_title">Requests</h4>
                </button>
              </Link>
              <button className="executive_btn_2">
                <h4 className="requests_btn_title">Events</h4>
              </button>
            </div>
            <CatalogExecutiveDashWidget />
          </Grid.Column>
        </Grid> */}
      </div>

      <div className="execDesktop">
        <div className="about" style={{ width: "50vw" }}>
          <Grid style={{ backgroundColor: "black", color: "white" }}>
            <Grid.Row>
              <Grid.Column width={8}>
                <h1>
                  <span style={{ color: "red" }}>EXCLUSIVE</span> FIREARMS
                  PROGRAM
                </h1>
              </Grid.Column>

              <Grid.Column width={8}>
                <Image src={Beard} className="evilBeardImage" size="large" />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <h2>Directory</h2>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={5} className="benefitsBoxes">
                <Link to="/ExecutiveAccount" className="links">
                  My Account
                  <Icon
                    style={{ marginLeft: "20%" }}
                    name="arrow circle right"
                  ></Icon>
                </Link>
              </Grid.Column>
              <Grid.Column width={5} className="benefitsBoxes">
                <Link to="/ExecutiveCatalog" className="links">
                  Catalog
                  <Icon
                    style={{ marginLeft: "20%" }}
                    name="arrow circle right"
                  ></Icon>
                </Link>
              </Grid.Column>
              <Grid.Column width={5} className="benefitsBoxes">
                <Link to="/Executiverequests" className="links">
                  Requests
                  <Icon
                    style={{ marginLeft: "20%" }}
                    name="arrow circle right"
                  ></Icon>
                </Link>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={5} className="serviceBoxes">
                <Grid.Row className="serviceBoxRows">
                  <Icon name="servicestack" color="red" size="huge" />
                </Grid.Row>
                <Grid.Row className="serviceBoxRows">
                  <h4>Your Concierge Service</h4>
                </Grid.Row>
                <Grid.Row className="serviceBoxRows" style={{ flex: "end" }}>
                  <p>
                    I like to make stuff up so that is shows in these p tags.
                  </p>
                </Grid.Row>
              </Grid.Column>
              <Grid.Column width={5} className="serviceBoxes">
                <Grid.Row className="serviceBoxRows">
                  <Icon name="key" color="red" size="huge" />
                </Grid.Row>
                <Grid.Row className="serviceBoxRows">
                  <h4>Priority Access</h4>
                </Grid.Row>
                <Grid.Row className="serviceBoxRows">
                  <p>
                    I like to make stuff up so that is shows in these p tags.
                  </p>
                </Grid.Row>
              </Grid.Column>
              <Grid.Column width={5} className="serviceBoxes">
                <Grid.Row className="serviceBoxRows">
                  <Icon name="shield" color="red" size="huge" />
                </Grid.Row>
                <Grid.Row className="serviceBoxRows">
                  <h4>NFA Program</h4>
                </Grid.Row>
                <Grid.Row className="serviceBoxRows">
                  <p>
                    I like to make stuff up so that is shows in these p tags.
                  </p>
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <h2>New Items</h2>
              </Grid.Column>
            </Grid.Row>
            <div className="scrollmenu">
              <Image
                className="scrollingImages"
                src="https://www.placecage.com/c/300/200"
              />
              <Image
                className="scrollingImages"
                src="https://www.placecage.com/c/300/200"
              />
              <Image
                className="scrollingImages"
                src="https://www.placecage.com/c/300/200"
              />
              <Image
                className="scrollingImages"
                src="https://www.placecage.com/c/300/200"
              />
              <Image
                className="scrollingImages"
                src="https://www.placecage.com/c/300/200"
              />
              <Image
                className="scrollingImages"
                src="https://www.placecage.com/c/300/200"
              />
              <Image
                className="scrollingImages"
                src="https://www.placecage.com/c/300/200"
              />
              <Image
                className="scrollingImages"
                src="https://www.placecage.com/c/300/200"
              />
              <Image
                className="scrollingImages"
                src="https://www.placecage.com/c/300/200"
              />
              <Image
                className="scrollingImages"
                src="https://www.placecage.com/c/300/200"
              />
              <Image
                className="scrollingImages"
                src="https://www.placecage.com/c/300/200"
              />
              <Image
                className="scrollingImages"
                src="https://www.placecage.com/c/300/200"
              />
            </div>

            <Grid.Row>
              <Grid.Column width={16}>
                <h2>Benefits</h2>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={5} className="benefitsBoxes">
                Priority Access
              </Grid.Column>
              <Grid.Column width={5} className="benefitsBoxes">
                Exclusive Items
              </Grid.Column>
              <Grid.Column width={5} className="benefitsBoxes">
                Unlimited Range
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={5} className="benefitsBoxes">
                Personalized Shopping
              </Grid.Column>
              <Grid.Column width={5} className="benefitsBoxes">
                Special Events
              </Grid.Column>
              <Grid.Column width={5} className="benefitsBoxes">
                New Releases
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={5} className="benefitsBoxes">
                Custom Builds
              </Grid.Column>
              <Grid.Column width={5} className="benefitsBoxes">
                NFA Program
              </Grid.Column>
              <Grid.Column width={5} className="benefitsBoxes">
                Gun Show
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDash;
