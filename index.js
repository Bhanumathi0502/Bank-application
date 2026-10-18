
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Temporary account data
let accounts = [
  {
    name: "Bhanu",
    accountNumber: "123456",
    balance: 5000
  }
];

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Banking Application");
});

// GET: Retrieve all accounts
app.get("/accounts", (req, res) => {
  res.json(accounts);
});

// GET: Retrieve one account
app.get("/accounts/:accountNumber", (req, res) => {
  const account = accounts.find(
    (item) => item.accountNumber === req.params.accountNumber
  );

  if (!account) {
    return res.status(404).json({
      message: "Account not found"
    });
  }

  res.json(account);
});

// POST: Create a new account
app.post("/accounts", (req, res) => {
  const { name, accountNumber, balance } = req.body;

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof accountNumber !== "string" ||
    !accountNumber.trim() ||
    typeof balance !== "number" ||
    !Number.isFinite(balance) ||
    balance < 0
  ) {
    return res.status(400).json({
      message: "Provide a name, account number, and valid balance"
    });
  }

  const existingAccount = accounts.find(
    (item) => item.accountNumber === accountNumber
  );

  if (existingAccount) {
    return res.status(409).json({
      message: "Account number already exists"
    });
  }

  const newAccount = {
    name: name.trim(),
    accountNumber: accountNumber.trim(),
    balance
  };

  accounts.push(newAccount);

  res.status(201).json({
    message: "Account created successfully",
    account: newAccount
  });
});

// PUT: Update account details
app.put("/accounts/:accountNumber", (req, res) => {
  const account = accounts.find(
    (item) => item.accountNumber === req.params.accountNumber
  );

  if (!account) {
    return res.status(404).json({
      message: "Account not found"
    });
  }

  const { name, balance } = req.body;

  if (
    name !== undefined &&
    (typeof name !== "string" || !name.trim())
  ) {
    return res.status(400).json({
      message: "Name must be a non-empty string"
    });
  }

  if (
    balance !== undefined &&
    (typeof balance !== "number" ||
      !Number.isFinite(balance) ||
      balance < 0)
  ) {
    return res.status(400).json({
      message: "Balance must be a valid non-negative number"
    });
  }

  if (name !== undefined) account.name = name.trim();
  if (balance !== undefined) account.balance = balance;

  res.json({
    message: "Account updated successfully",
    account
  });
});

// DELETE: Delete an account
app.delete("/accounts/:accountNumber", (req, res) => {
  const index = accounts.findIndex(
    (item) => item.accountNumber === req.params.accountNumber
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Account not found"
    });
  }

  accounts.splice(index, 1);

  res.json({
    message: "Account deleted successfully"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Banking application running at http://localhost:${PORT}`);
});
