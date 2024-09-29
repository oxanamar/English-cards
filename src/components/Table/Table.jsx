import React, { useState } from "react";
import "./Table.css";

function Table() {
  // State to manage the first row's input fields
  const [inputData, setInputData] = useState({
    nickname: "",
    firstname: "",
    lastname: "",
  });

  // State to manage the list of saved rows
  const [rows, setRows] = useState([]);

  // Handler for updating the first row's input fields
  const handleChange = (field, value) => {
    setInputData({
      ...inputData,
      [field]: value,
    });
  };

  // Handler to save the first row's data and add a new row underneath
  const saveRow = () => {
    if (inputData.nickname && inputData.firstname && inputData.lastname) {
      setRows([...rows, { ...inputData, isEditing: false }]);
      // Clear the input fields after saving
      setInputData({ nickname: "", firstname: "", lastname: "" });
    }
  };

  // Handler to delete a row and automatically adjust the numbering
  const deleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1); // Remove the row by index
    setRows(updatedRows);
  };

  // Handler to toggle edit mode for a row
  const toggleEdit = (index) => {
    setRows(
      rows.map((row, i) =>
        i === index ? { ...row, isEditing: !row.isEditing } : row
      )
    );
  };

  // Handler for updating the fields of a row in edit mode
  const handleRowChange = (index, field, value) => {
    setRows(
      rows.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  // Handler to save changes after editing a row
  const saveRowChanges = (index) => {
    toggleEdit(index);
  };

  // Handler to clear the input fields in the first row
  const clearInputs = () => {
    setInputData({ nickname: "", firstname: "", lastname: "" });
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nickname</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* First row with input fields */}
          <tr>
            <td>1</td>
            <td>
              <input
                type="text"
                value={inputData.nickname}
                onChange={(e) => handleChange("nickname", e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={inputData.firstname}
                onChange={(e) => handleChange("firstname", e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={inputData.lastname}
                onChange={(e) => handleChange("lastname", e.target.value)}
              />
            </td>
            <td>
              <button className="save" onClick={saveRow}>
                Save
              </button>
              <button className="clear" onClick={clearInputs}>
                Clear
              </button>
            </td>
          </tr>

          {/* Display rows after the first one, with dynamic numbering */}
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{index + 2}</td> {/* Adjust row numbering dynamically */}
              <td>
                {row.isEditing ? (
                  <input
                    type="text"
                    value={row.nickname}
                    onChange={(e) =>
                      handleRowChange(index, "nickname", e.target.value)
                    }
                  />
                ) : (
                  row.nickname
                )}
              </td>
              <td>
                {row.isEditing ? (
                  <input
                    type="text"
                    value={row.firstname}
                    onChange={(e) =>
                      handleRowChange(index, "firstname", e.target.value)
                    }
                  />
                ) : (
                  row.firstname
                )}
              </td>
              <td>
                {row.isEditing ? (
                  <input
                    type="text"
                    value={row.lastname}
                    onChange={(e) =>
                      handleRowChange(index, "lastname", e.target.value)
                    }
                  />
                ) : (
                  row.lastname
                )}
              </td>
              <td>
                {row.isEditing ? (
                  <button onClick={() => saveRowChanges(index)}>Save</button>
                ) : (
                  <button onClick={() => toggleEdit(index)}>Edit</button>
                )}
                <button className="delete" onClick={() => deleteRow(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
