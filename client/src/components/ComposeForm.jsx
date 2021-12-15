import Button from "@mui/material/Button";
import { useState } from "react";
import "./ComposeForm.css";
import Card from "@mui/material/Card";
export default function ComposeForm({ onSubmit }) {
  const [editorValue, setEditorValue] = useState("");

  const handleEditorValueChange = (e) => {
    setEditorValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSubmit function with the latest textarea value
    onSubmit(editorValue);
    // Reset the textarea content
    setEditorValue("");
  };

  return (
    <form className="compose-form" onSubmit={handleSubmit}>
      <div className="compose-form-container">
        <textarea
          className="compose-form-textarea"
          value={editorValue}
          onChange={handleEditorValueChange}
          placeholder="Write your post here..."
        />
      </div>
      <Button
        type="submit"
        variant="contained"
        sx={{ margin: "10px", marginTop: "20px" }}
      >
        Submit
      </Button>
    </form>
  );
}
