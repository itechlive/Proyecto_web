document.addEventListener('DOMContentLoaded', () => {
    const currentDateElement = document.getElementById('currentDate');
    const currentDate = new Date();
    const options = { month: 'long', year: 'numeric'};
    const formattedDate = currentDate.toLocaleDateString(undefined, options);
    currentDateElement.textContent = formattedDate;

    const ingresosTab = document.getElementById('ingresos');
    const egresosTab = document.getElementById('egresos');
    const border1 = document.getElementById('border1');
    const border2 = document.getElementById('border2');

    ingresosTab.addEventListener('change', function () {
      if (this.checked) {
        border1.style.border = '2px solid blue';
        border1.style.backgroundColor = '#26489a';
        border2.style.border = 'none';
        border2.style.backgroundColor = 'transparent';
      }
    });

    egresosTab.addEventListener('change', function () {
      if (this.checked) {
        border2.style.border = '2px solid blue';
        border2.style.backgroundColor = '#26489a';
        border1.style.border = 'none';
        border1.style.backgroundColor = 'transparent';
      }
    });

});

let incomeTotal = 0;
let expenseTotal = 0;

function addTransaction() {
  const transactionType = document.getElementById("transactionType").value;
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);

  if (transactionType === "none") {
    alert("Por favor, seleccione el tipo de transacción.");
    return;
  }

  if (description === "") {
    alert("Por favor, ingrese una descripción.");
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    alert("El valor ingresado no es válido. Por favor, intente de nuevo.");
    return;
  }

  const tableBody =
    transactionType === "income"
      ? document.getElementById("incomeTableBody")
      : document.getElementById("expenseTableBody");
  const newRow = tableBody.insertRow(-1);

  const descriptionCell = newRow.insertCell(0);
  const amountCell = newRow.insertCell(1);
  const actionCell = newRow.insertCell(2);

  descriptionCell.textContent = description;
  amountCell.textContent = amount.toFixed(2);

  

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Borrar";
  deleteButton.onclick = function () {
    deleteTransaction(newRow, transactionType);
  };

  actionCell.appendChild(deleteButton);

  if (transactionType === "income") {
    incomeTotal += amount;
  } else if (transactionType === "expense") {
    expenseTotal += amount;
  }

  updateTotals();

  // Limpiar el formulario
  document.getElementById("budgetForm").reset();
  document.getElementById("transactionType").selectedIndex = 0;
}



function deleteTransaction(row, transactionType) {
  const amount = parseFloat(row.cells[1].textContent);

  if (transactionType === "income") {
    incomeTotal -= amount;
  } else if (transactionType === "expense") {
    expenseTotal -= amount;
  }

  row.remove();
  updateTotals();
}

function updateTotals() {
  document.getElementById("totalIncome").textContent = incomeTotal.toFixed(2);
  document.getElementById("totalExpense").textContent = expenseTotal.toFixed(2);

  const grandTotal = incomeTotal - expenseTotal;
  document.getElementById("grandTotalAmount").textContent = grandTotal.toFixed(2);

  // Update grand total color based on positive/negative value
  document.getElementById("grandTotalAmount").style.color = grandTotal >= 0 ? "green" : "red";

  // Calculate and display the expense percentage
  const expensePercentage = incomeTotal === 0 ? 0 : (expenseTotal / incomeTotal) * 100;
  document.getElementById("expensePercentageValue").textContent = expensePercentage.toFixed(0) + "%";
}
