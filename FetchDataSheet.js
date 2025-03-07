const sheet_id = "1aNOkajYXckSduHTAWXdt3lV-8UnP1tey6c7fqtpvo1A";
const sheet_title = "Form responses 1";
const sheet_range = "A1:K200";
const url = `https://docs.google.com/spreadsheets/d/${sheet_id}/gviz/tq?sheet=${sheet_title}&range=${sheet_range}`;

console.log(url);

// Define a function to fetch data and return a Promise
async function fetchData() {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const rep = await res.text();
    const data = JSON.parse(rep.substr(47).slice(0, -2));

    console.log(data);

    const tableData = [];

    data.table.rows.forEach((row, index) => {
      const rowData = {};
      rowData["SNO"] = index + 1;

      if (row.c) {
        // Check if row.c exists
        row.c.forEach((cell, colIndex) => {
          let value = "-"; // Default value is null for missing data

          if (cell) {
            // If the cell exists
            value = cell.v;

            // Handle string values that start with "Date" and store formatted date
            if (typeof value === "string" && value.startsWith("Date")) {
              value = cell.f; // Use the formatted value if it's a date
            }
          }

          // Get the corresponding header for the column index
          const header =
            data.table.cols[colIndex]?.label || `Column ${colIndex + 1}`;

          // Assign value to the rowData with the corresponding header
          rowData[header] = value;
        });
      }

      tableData.push(rowData);
      console.log(rowData);
    });

    return tableData;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

//--------------------------------------------------------
function orderedData(array, opt, need) {
  const filterByOpt = [];

  // Check if the 'opt' is "all", and return the entire array if so
  if (opt === "all") {
    return array;
  } else {
    array.forEach((row) => {
      if (row[need] === opt) {
        filterByOpt.push(row);
      }
    });
    return filterByOpt;
  }
}

// Call fetchData and then use the returned data
// You cannot access tableData here directly as it's an asynchronous operation

// If you need to use tableData in another function, you should call that function within the .then() block

export { fetchData, orderedData };
