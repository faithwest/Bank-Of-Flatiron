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