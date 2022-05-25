import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

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
      {/* Filter Theatre */}
    <div className="p-3 mb-2 text-light rounded-3" style={{ backgroundColor: "#0E3662", float: "left" }} >
      <div class="form-check">
        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="" onChange={handleFilter} />
        <label class="form-check-label" for="exampleRadios2">
          ALL
        </label>
      </div>

      <div class="form-check" >
        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="Savoy" onChange={handleFilter} />
        <label class="form-check-label" for="exampleRadios1">
          Savoy
        </label>
      </div>
      
      <div class="form-check">
        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="Regal" onChange={handleFilter}/>
        <label class="form-check-label" for="exampleRadios2">
          Regal
        </label>
      </div>
      
      <div class="form-check">
        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="Liberty" onChange={handleFilter} />
        <label class="form-check-label" for="exampleRadios3">
          Liberty
        </label>
      </div>
    </div>
    </Form>
  );
};

export default SearchBox;
