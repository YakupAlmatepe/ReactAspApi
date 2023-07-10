import React, { useState, useEffect } from "react";
import axios from "axios";

function PersonCrud() {
  const [id, setId] = useState("");
  const [stname, setName] = useState("");
  const [stsurname, setSurname] = useState("");
  const [stadress, setAdress] = useState("");
  const [stdescription, setDescription] = useState("");
  const [person, setUsers] = useState([]);

  useEffect(() => {
    Load();
  }, []);

  async function Load() {
    try {
      const response = await axios.get("https://localhost:7143/api/Person/GetPerson");
      setUsers(response.data);
    } catch (error) {
      console.error("Error while fetching people:", error);
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7143/api/Person/AddPerson", {
        stname: stname,
        stsurname: stsurname,
        stadress: stadress,
        stdescription: stdescription,
      });
      alert("Kişi Kaydı Başarılı");
      clearForm();
      Load();
    } catch (error) {
      console.error("Error while saving person:", error);
    }
  }

  async function editPerson(selectedPerson) {
    setId(selectedPerson.id);
    setName(selectedPerson.stname);
    setSurname(selectedPerson.stsurname);
    setAdress(selectedPerson.stadress);
    setDescription(selectedPerson.stdescription);
  }

  async function deletePerson(id) {
    try {
      await axios.delete("https://localhost:7143/api/Person/DeletePerson/" + id);
      alert("Kişi Silme Tamamlandı");
      clearForm();
      Load();
    } catch (error) {
      console.error("Error while deleting person:", error);
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.put(
        `https://localhost:7143/api/Person/UpdatePerson/${id}`,
        {
          id: id,
          stname: stname,
          stsurname: stsurname,
          stadress: stadress,
          stdescription: stdescription,
        }
      );
      alert("Kişi Güncelleme Tamam");
      clearForm();
      Load();
    } catch (error) {
      console.error("Error while updating person:", error);
    }
  }

  function clearForm() {
    setId("");
    setName("");
    setSurname("");
    setAdress("");
    setDescription("");
  }

  return (
    <div>
      <h1>Person Details</h1>
      <div className="container mt-4">
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Person Name"
              value={stname}
              onChange={(event) => setName(event.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Person Surname"
              value={stsurname}
              onChange={(event) => setSurname(event.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Person Address"
              value={stadress}
              onChange={(event) => setAdress(event.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={stdescription}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div>
            <button className="btn btn-primary mt-4" onClick={save}>
              Register
            </button>
            <button className="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <br />
      <table className="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Person Id</th>
            <th scope="col">Person Name</th>
            <th scope="col">Person Surname</th>
            <th scope="col">Person Address</th>
            <th scope="col">Description</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
          {person.map((person) => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.stname}</td>
              <td>{person.stsurname}</td>
              <td>{person.stadress}</td>
              <td>{person.stdescription}</td>
              <td>
                <button className="btn btn-warning" onClick={() => editPerson(person)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => deletePerson(person.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
      <tbody>
  {person.map((person) => (
    <tr key={person.ID}>
      <td>{person.ID}</td>
      <td>{person.Name}</td>
      <td>{person.Surname}</td>
      <td>{person.Adress}</td>
      <td>{person.Description}</td>
      <td>
        <button className="btn btn-warning" onClick={() => editPerson(person)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => deletePerson(person.ID)}>
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

export default PersonCrud;
