import React, { useState } from "react";
import CatalogNewItemForm from "../../components/CatalogNewItemForm";
import HeaderComponent from "../../components/HeaderComponent";
import ImageUploader from "react-images-upload";
import { Button, Segment, Dimmer, Loader, Image } from "semantic-ui-react";
import { useSelector } from "react-redux";

import API from "../../utils/API";

function CatalogNewItemPage() {
  const { token } = useSelector((state) => state.auth);
  const [pictures, setPictures] = useState([]);
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(false);

  const onFormSubmit = async (formVal) => {
    const options = {
      headers: {
        token: token,
      },
    };
    const { data } = await API.newCatalogItem(formVal, options);
    setItem(data);
    console.log(data);
  };

  const onDrop = async (picture) => {
    console.log(picture);
    setPictures(picture);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { id } = item;
    console.log(pictures);
    for (const picture of pictures) {
      const data = new FormData();
      data.append("file", picture);
      console.log(picture);
      const options = {
        headers: {
          token: token,
        },
      };
      const test = await API.uploadImages(data, id);
      console.log(test);
    }
    setLoading(false);
    window.location.reload();

    setPictures([]);
  };
  return (
    <div style={{ width: "100%", overflowY: "scroll" }}>
      <HeaderComponent icon="plus" title="Add New Item" link="yes" />
      {loading ? (
        <div>
          <Segment>
            <Dimmer active>
              <Loader indeterminate>Preparing Files</Loader>
            </Dimmer>

            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Segment>
        </div>
      ) : (
        <div className="form-container">
          {item ? (
            <div></div>
          ) : (
            <CatalogNewItemForm
              buttonText="Create Item"
              onSubmit={onFormSubmit}
            />
          )}

          {item ? (
            <div>
              <h4>Upload Images</h4>
              <ImageUploader
                withIcon={true}
                buttonText="Choose images"
                onChange={onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                maxFileSize={5242880}
                singleImage={false}
                withPreview={true}
              />
              <Button onClick={handleSubmit}>Upload Images</Button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
}

export default CatalogNewItemPage;
