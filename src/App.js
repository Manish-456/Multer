import axios from "axios";
import React from "react";
import { useState } from "react";
import "./App.css";
const App = () => {
  const [file, setFile] = useState(null);
  const [alert, setAlert] = useState(null);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);

      try {
        const res = await axios.post(`http://localhost:8080/api/upload`, data);
        setAlert(res.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      setAlert("Please choose images first");
    }
    setFile("");
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  return (
    <div>
      {alert && (
        <div className="alert">
          <span className="alertMessage">{alert}</span>
        </div>
      )}
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <label htmlFor="file">Upload images</label>
        <input
          type="file"
          name="file"
          id="file"
          accept=".jpg, .jpeg, .png"
          style={{
            display: "none",
          }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        {file && (
          <img className="imgFile" src={URL.createObjectURL(file)} alt="" />
        )}

        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default App;
