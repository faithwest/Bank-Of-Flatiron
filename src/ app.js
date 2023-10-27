import React, { useState, useEffect } from "react";

function App() {
  // useState creates some containers for our data,and allows us to change what's in there
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    description: "",
    category: "",
    amount: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // useEffect something when our app starts.
    // fetch data from a file:"data.json" , put it in the "transactions" variable.
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setTransactions(data.transactions))
      .catch((error) => console.error("Error fetching data: " + error));
  }, []); // The "[]" means only do this when the app starts.

  const handleInputChange = (e) => {
    //  typing in an input field calls this function 
    //  keep tabs of what is typed and updates the "newTransaction" variable.
    const { name, value } = e.target;
    setNewTransaction({
      ...newTransaction,
      [name]: name === "amount" ? parseFloat(value) : value,
    });
  };
  //handling transactions
  const handleAddTransaction = () => {
    // on click of a button ,calls a function
    // adds the new transactionthat we filled to transaction list.
    setTransactions([...transactions, newTransaction]);

    // function to reset
    setNewTransaction({
      date: "",
      description: "",
      category: "",
      amount: 0,
    });
  }
  const filteredTransactions = transactions.filter((transaction) =>
  // filtering  transactions to only show the ones that match our search term.
  // when something is typed in search box, this helps us  to find and show the matching transactions.
  transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
);

//lets create some jsx to inject into the html 
return (
    <div>
      <h1>Bank Transactions</h1>
      <input
        type="text"
        placeholder="Search transactions"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {/* showing the transactions in a table. */}
          {filteredTransactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add Transaction</h2>
      {/* form to add new transactions. */}
      <input
        type="text"
        name="date"
        placeholder="Date"
        value={newTransaction.date}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={newTransaction.description}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={newTransaction.category}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={newTransaction.amount}
        onChange={handleInputChange}
      />
      <button onClick={handleAddTransaction}>Add</button>
    </div>
  );
}

export default App;