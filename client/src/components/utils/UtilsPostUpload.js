import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";

function UtilsPostUpload(props) {
  const [Images, setImages] = useState([]);

  const dropHandler = (files) => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/fomr-data" },
    };

    formData.append("file", files[0]);

    axios.post("/api/products/image", formData, config).then((response) => {
      console.log(response.data);
      if (response.data.filesave) {
        setImages([...Images, response.data.filePath]);
        props.profileFunction([...Images, response.data.filePath]);
      } else {
        alert("tl");
      }
    });
  };

  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image);

    let newImages = [...Images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
    props.profileFunction(newImages);
  };

  return (
    <div style={{ display: "flex", margin: "20px", width: "80%" }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              style={{
                minWidth: "350px",
                height: "240px",
                border: "1px solid lightgray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <AiOutlinePlus style={{ fontSize: "3rem" }} />
            </div>
          </section>
        )}
      </Dropzone>
      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll",
        }}
      >
        {Images.map((image, i) => (
          <div onClick={() => deleteHandler(image)} key={i}>
            <img
              style={{ minWidth: "300px", width: "300px", height: "240px" }}
              src={`http://localhost:5000/${image}`}
              alt="img"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UtilsPostUpload;
