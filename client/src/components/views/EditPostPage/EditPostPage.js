import React, { useState } from "react";
import { Typography, Button, Form, message, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import UtilsPostUpload from "../../utils/UtilsPostUpload";
import { useNavigate } from "react-router-dom";
import { postProduct } from "../../../_actions/product_action";
import axios from "axios";

const { Title } = Typography;

function UploadPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [Images, setImages] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [Description, setDescription] = useState("");
  const postTitleChange = (e) => {
    setPostTitle(e.currentTarget.value);
  };
  const descriptionChange = (e) => {
    setDescription(e.currentTarget.value);
  };

  const updateImage = (newImage) => {
    setImages(newImage);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!window.confirm("정말로????수정할거야??")) return;

    let body = {
      _id: props.postId,
      title: postTitle,
      description: Description,
      images: Images,
    };

    axios.post("/api/products/editpost", body).then((response) => {
      if (response.data.edit) {
        alert("edited");
        window.location.reload();
      } else {
        alert("fail to edit");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <Title>Upload Post</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "90%",
          }}
        >
          <UtilsPostUpload profileFunction={updateImage} />
        </div>

        <br />
        <br />
        <div>
          <label>Title</label>
          <Input onChange={postTitleChange} value={postTitle} />
          <label>Description</label>
          <Input onChange={descriptionChange} value={Description} />
        </div>

        <br />
        <br />

        <Button size="large" onClick={onSubmit}>
          Post
        </Button>
      </Form>
    </div>
  );
}

export default UploadPage;
