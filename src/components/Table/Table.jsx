import React, { useState, useContext } from "react";
import { AppContext } from "../AppContext/AppContext";
import { FaSave, FaPen, FaTrash, FaSyncAlt, FaTimes } from "react-icons/fa";
import Loader from "../Loader/Loader";
import styles from "./table.module.css";

function Table() {
  const { words, loading, error, addWord, updateWord, deleteWord } =
    useContext(AppContext);

  // State for managing form inputs and validation errors
  const [inputData, setInputData] = useState({
    id: "",
    english: "",
    transcription: "",
    russian: "",
    tags: "", // Collection (displayed as 'Collection' in UI)
  });
  const [validationError, setValidationError] = useState(false);

  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (field, value) => {
    setInputData({
      ...inputData,
      [field]: value,
    });
    setValidationError(false);
  };

  const saveRow = () => {
    const isValid =
      inputData.id &&
      inputData.english &&
      inputData.transcription &&
      inputData.russian &&
      inputData.tags;

    if (isValid) {
      addWord(inputData);
      setInputData({
        id: "",
        english: "",
        transcription: "",
        russian: "",
        tags: "",
      });
    } else {
      setValidationError(true);
      alert("Please fill in all fields.");
    }
  };

  const startEditing = (index, word) => {
    setEditingIndex(index);
    setInputData(word);
  };

  const saveRowChanges = (id) => {
    updateWord(id, inputData);
    setEditingIndex(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setInputData({
      id: "",
      english: "",
      transcription: "",
      russian: "",
      tags: "",
    });
  };

  if (loading) return <Loader />;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className={styles["table-container"]}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>English</th>
            <th>Transcription</th>
            <th>Russian</th>
            <th>Collection</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Form for adding a new word */}
          <tr>
            <td>
              <input
                type="text"
                value={inputData.id}
                onChange={(e) => handleChange("id", e.target.value)}
                className={
                  validationError && !inputData.id ? styles.errorInput : ""
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={inputData.english}
                onChange={(e) => handleChange("english", e.target.value)}
                className={
                  validationError && !inputData.english ? styles.errorInput : ""
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={inputData.transcription}
                onChange={(e) => handleChange("transcription", e.target.value)}
                className={
                  validationError && !inputData.transcription
                    ? styles.errorInput
                    : ""
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={inputData.russian}
                onChange={(e) => handleChange("russian", e.target.value)}
                className={
                  validationError && !inputData.russian ? styles.errorInput : ""
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={inputData.tags}
                onChange={(e) => handleChange("tags", e.target.value)}
                className={
                  validationError && !inputData.tags ? styles.errorInput : ""
                }
              />
            </td>
            <td>
              <button className={styles["btn-save"]} onClick={saveRow}>
                <FaSave />
              </button>
              <button className={styles["btn-clear"]} onClick={cancelEdit}>
                <FaSyncAlt />
              </button>
            </td>
          </tr>

          {/* Display words from context */}
          {words.map((word, index) => (
            <tr key={word.id}>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={inputData.id}
                    onChange={(e) => handleChange("id", e.target.value)}
                  />
                ) : (
                  word.id
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={inputData.english}
                    onChange={(e) => handleChange("english", e.target.value)}
                  />
                ) : (
                  word.english
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={inputData.transcription}
                    onChange={(e) =>
                      handleChange("transcription", e.target.value)
                    }
                  />
                ) : (
                  word.transcription
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={inputData.russian}
                    onChange={(e) => handleChange("russian", e.target.value)}
                  />
                ) : (
                  word.russian
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={inputData.tags}
                    onChange={(e) => handleChange("tags", e.target.value)}
                  />
                ) : (
                  word.tags
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <>
                    <button
                      className={styles["btn-save"]}
                      onClick={() => saveRowChanges(word.id)}
                    >
                      <FaSave />
                    </button>
                    <button
                      className={styles["btn-cancel"]}
                      onClick={cancelEdit}
                    >
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={styles["btn-edit"]}
                      onClick={() => startEditing(index, word)}
                    >
                      <FaPen />
                    </button>
                    <button
                      className={styles["btn-delete"]}
                      onClick={() => deleteWord(word.id)}
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
