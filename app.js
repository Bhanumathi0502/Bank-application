
const $ = (id) => document.getElementById(id);

let accounts = [];
let transactions = [];

try {
    const savedAccounts = JSON.parse(
        localStorage.getItem("myBankAccounts") || "[]"
    );
    const savedTransactions = JSON.parse(
        localStorage.getItem("myBankTransactions") || "[]"
    );

    if (Array.isArray(savedAccounts)) {
        accounts = savedAccounts.filter(account =>
            account &&
            typeof account.name === "string" &&
            typeof account.accountNumber === "string" &&
            Number.isFinite(Number(account.balance)) &&
            Number(account.balance) >= 0
        );
    }

    if (Array.isArray(savedTransactions)) {
        transactions = savedTransactions.filter(transaction =>
            transaction &&
            typeof transaction.accountNumber === "string" &&
            Number.isFinite(Number(transaction.amount))
        );
    }
} catch {
    accounts = [];
    transactions = [];
}

const pageTitles = {
    home: "Dashboard",
    create: "Create Account",
    deposit: "Deposit Money",
    withdraw: "Withdraw Money",
    accounts: "All Accounts",
    transactions: "Transaction History"
};

function saveData() {
    localStorage.setItem(
        "myBankAccounts",
        JSON.stringify(accounts)
    );

    localStorage.setItem(
        "myBankTransactions",
        JSON.stringify(transactions)
    );
}

function money(amount) {
    return Number(amount).toLocaleString("en-IN", {
        style: "currency",
        currency: "INR"
    });
}

function showMessage(id, text, success) {
    const element = $(id);
    element.textContent = text;
    element.className = success
        ? "message success"
        : "message error";
}

function navigate(page) {
    if (!pageTitles[page]) return;

    document.querySelectorAll(".page").forEach(section => {
        section.classList.toggle("active", section.id === page);
    });

    document.querySelectorAll(".nav-btn").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.page === page
        );
    });

    $("pageTitle").textContent = pageTitles[page];

    if (page === "deposit" || page === "withdraw") {
        updateAccountOptions();
    }

    if (page === "accounts") {
        renderAccounts();
    }

    if (page === "transactions") {
        renderTransactions();
    }

    if (page === "home") {
        renderHome();
    }
}

document.querySelectorAll("[data-page]").forEach(button => {
    button.addEventListener("click", () => {
        navigate(button.dataset.page);
    });
});

function addTransaction(account, type, amount) {
    transactions.unshift({
        id: Date.now() + "-" + Math.random().toString(36).slice(2),
        name: account.name,
        accountNumber: account.accountNumber,
        type,
        amount: Number(amount.toFixed(2)),
        date: new Date().toLocaleString("en-IN")
    });
}

function renderHome() {
    $("totalAccounts").textContent = accounts.length;

    const totalBalance = accounts.reduce(
        (sum, account) => sum + Number(account.balance),
        0
    );

    $("totalBalance").textContent = money(totalBalance);
    $("totalTransactions").textContent = transactions.length;

    const tbody = $("recentTransactions");
    tbody.replaceChildren();

    transactions.slice(0, 5).forEach(transaction => {
        const row = document.createElement("tr");

        [
            transaction.name || "Account",
            transaction.type,
            money(transaction.amount),
            transaction.date
        ].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        tbody.appendChild(row);
    });

    $("recentEmpty").hidden = transactions.length > 0;
}

function updateAccountOptions() {
    ["depositAccount", "withdrawAccount"].forEach(id => {
        const select = $(id);
        const previousValue = select.value;

        select.replaceChildren();

        const placeholder = document.createElement("option");
        placeholder.value = "";
        placeholder.textContent = accounts.length
            ? "Select an account"
            : "Create an account first";
        select.appendChild(placeholder);

        accounts.forEach(account => {
            const option = document.createElement("option");
            option.value = account.accountNumber;
            option.textContent =
                `${account.name} - ${account.accountNumber}`;
            select.appendChild(option);
        });

        if (accounts.some(account =>
            account.accountNumber === previousValue
        )) {
            select.value = previousValue;
        }
    });
}

$("createForm").addEventListener("submit", event => {
    event.preventDefault();

    const name = $("customerName").value.trim();
    const accountNumber = $("newAccountNumber").value.trim();
    const initialBalance = Number($("initialBalance").value);

    if (!name || !/^\d+$/.test(accountNumber)) {
        showMessage(
            "createMessage",
            "Enter a name and a numeric account number.",
            false
        );
        return;
    }

    if (!Number.isFinite(initialBalance) ||
        initialBalance < 0 ||
        Math.round(initialBalance * 100) !== initialBalance * 100) {
        showMessage(
            "createMessage",
            "Enter a valid initial balance.",
            false
        );
        return;
    }

    if (accounts.some(account =>
        account.accountNumber === accountNumber
    )) {
        showMessage(
            "createMessage",
            "This account number already exists.",
            false
        );
        return;
    }

    const account = {
        name,
        accountNumber,
        balance: initialBalance
    };

    accounts.push(account);

    if (initialBalance > 0) {
        addTransaction(account, "Initial Deposit", initialBalance);
    }

    saveData();
    updateAccountOptions();
    renderHome();
    renderAccounts();

    $("createForm").reset();

    showMessage(
        "createMessage",
        "Account created successfully!",
        true
    );
});

function processMoney(formId, accountSelectId, amountId,
                      messageId, type) {
    $(formId).addEventListener("submit", event => {
        event.preventDefault();

        const accountNumber = $(accountSelectId).value;
        const amount = Number($(amountId).value);

        const account = accounts.find(item =>
            item.accountNumber === accountNumber
        );

        if (!account) {
            showMessage(
                messageId,
                "Please select a valid account.",
                false
            );
            return;
        }

        if (!Number.isFinite(amount) ||
            amount <= 0 ||
            Math.round(amount * 100) !== amount * 100) {
            showMessage(
                messageId,
                "Enter a valid amount greater than zero.",
                false
            );
            return;
        }

        const currentBalance = Math.round(
            Number(account.balance) * 100
        );

        const amountInPaise = Math.round(amount * 100);

        if (type === "Withdraw" &&
            amountInPaise > currentBalance) {
            showMessage(
                messageId,
                "Insufficient balance!",
                false
            );
            return;
        }

        const newBalance = type === "Deposit"
            ? currentBalance + amountInPaise
            : currentBalance - amountInPaise;

        if (!Number.isSafeInteger(newBalance)) {
            showMessage(
                messageId,
                "Amount is too large.",
                false
            );
            return;
        }

        account.balance = newBalance / 100;

        addTransaction(account, type, amount);
        saveData();

        renderHome();
        renderAccounts();
        renderTransactions();

        $(formId).reset();
        updateAccountOptions();

        showMessage(
            messageId,
            `${type} successful! New balance: ${money(account.balance)}`,
            true
        );
    });
}

processMoney(
    "depositForm",
    "depositAccount",
    "depositAmount",
    "depositMessage",
    "Deposit"
);

processMoney(
    "withdrawForm",
    "withdrawAccount",
    "withdrawAmount",
    "withdrawMessage",
    "Withdraw"
);

function renderAccounts() {
    const tbody = $("accountsTable");
    tbody.replaceChildren();

    const search = $("accountSearch").value.toLowerCase().trim();

    const filteredAccounts = accounts.filter(account =>
        account.name.toLowerCase().includes(search) ||
        account.accountNumber.toLowerCase().includes(search)
    );

    filteredAccounts.forEach(account => {
        const row = document.createElement("tr");

        [account.name, account.accountNumber, money(account.balance)]
            .forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.type = "button";

        deleteButton.addEventListener("click", () => {
            if (!confirm(
                `Delete account ${account.accountNumber}?`
            )) return;

            accounts = accounts.filter(item =>
                item.accountNumber !== account.accountNumber
            );

            saveData();
            renderAccounts();
            renderHome();
            updateAccountOptions();
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        tbody.appendChild(row);
    });

    $("accountsEmpty").hidden = filteredAccounts.length > 0;
}

$("accountSearch").addEventListener("input", renderAccounts);

function renderTransactions() {
    const tbody = $("transactionsTable");
    tbody.replaceChildren();

    transactions.forEach(transaction => {
        const row = document.createElement("tr");

        [
            transaction.name || "Account",
            transaction.accountNumber,
            transaction.type,
            money(transaction.amount),
            transaction.date
        ].forEach((value, index) => {
            const cell = document.createElement("td");
            cell.textContent = value;

            if (index === 2) {
                cell.style.color =
                    transaction.type === "Withdraw"
                        ? "#d97706"
                        : "#16865c";
            }

            row.appendChild(cell);
        });

        tbody.appendChild(row);
    });

    $("transactionsEmpty").hidden = transactions.length > 0;
}

updateAccountOptions();
renderHome();
renderAccounts();
renderTransactions();
navigate("home");
