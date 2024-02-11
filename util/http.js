import axios from "axios";

const BACKEND_URL =
  "https://react-native-course-aa3f6-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name; //This name will holds the auto generated id
  return id;
}

export async function fetchExpenses() {
  // Here we have turned this into async function
  const response = await axios.get(BACKEND_URL + "/expenses.json"); // We have await the GET promise and stored the eventually returned data which in this case will be a response object with more details about the response in a constant

  // This line will only be execute when the response is there from the server and then we can use this response

  // Now when it comes to using the response for Firebase, the response we get back will actually be an object where these unique id's will be keys (So property names in that object) and then we have nested object for these keys that holds the actual data

  const expenses = []; // This is expenses helper constant which holds an array

  // And we can use a for loop to go through all our response keys
  // console.log(response.data);

  for (const key in response.data) {
    //Axios gives ua a data property on this response object which holds the actual data that was sent back by the server

    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };

    expenses.push(expenseObj);
  }

  return expenses; // This code will simply transform the data sent back from firebase into an array of objects that have the format we want them to have.
}

export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
