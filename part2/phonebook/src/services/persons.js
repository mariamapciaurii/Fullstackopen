import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const create = personObject => axios.post(baseUrl, personObject).then(response => response.data);
const getAll = () => axios.get(baseUrl).then(response => response.data);
const update = (personObject, id) => axios.put(`${baseUrl}/${id}`, personObject).then(response => response.data);
const remove = id => axios.delete(`${baseUrl}/${id}`, { data: id }).then(response => response.config.data);

const personService = { getAll, create, update, remove };

export default personService;