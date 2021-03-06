import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../screens/main.css";


const SearchBox = ({ history, search, setSearchWord }) => {

  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };


  //Filter Theater
  const handleFilter = (e) =>{
    const searchKey= e.currentTarget.value;
      setSearchWord(searchKey)
    }



  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Tickets..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button
        style={{ backgroundColor: "#00cc00", color: "white" }}
        type="submit"
        variant="outline-success"
        className="p-2"
      >
        Search
      </Button>

    &nbsp; &nbsp; &nbsp;
      {/* Filter Theater radio button form */}
    <div className="p-3 mb-10 text-light" style={{ backgroundColor: "dark", justifyContent:"left"}} >
      <div className="form-check" style={{ backgroundColor: "dark", justifyContent:"left"}}>
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="" onChange={handleFilter} />
        <label className="form-check-label" for="flexRadioDefault1">
          ALL
        </label>
      </div>

      <div className="form-check" style={{justifyContent:"left"}}>
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="Savoy" onChange={handleFilter} />
        <label className="form-check-label" for="flexRadioDefault2">
          Savoy
        </label>
      </div>
      
      <div className="form-check" style={{justifyContent:"left"}}>
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value="Regal" onChange={handleFilter}/>
        <label className="form-check-label" for="flexRadioDefault3">
          Regal
        </label>
      </div>
      
      <div className="form-check" style={{justifyContent:"left"}}>
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" value="Liberty" onChange={handleFilter} />
        <label className="form-check-label" for="flexRadioDefault4">
          Liberty
        </label>
      </div>

    </div>
    </Form>
  );
};

export default SearchBox;
