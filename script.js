import { fetchData, orderedData } from "./FetchDataSheet.js";

const DriverName_ = document.getElementById("DriverName");
const Search = document.getElementById("search");
const tbody = document.getElementById("tbody");
const thead = document.getElementById("thead");
function onchangeToHideErrMess(id) {
  const elem = document.getElementById("err");
  const Event = document.getElementById(id);
  // loader
  window.addEventListener("load", () => {
    overlay.style.display = "none";
  });
  // console.log(Event);
  Event.addEventListener("click", () => {
    elem.innerHTML = "";
    elem.removeAttribute("class");
  });
}
onchangeToHideErrMess("DriverName");
// Function to add filtered data to HTML
function AddFilterinHtml(filteredData) {
  document.getElementById("table-id").style.display = "block";

  thead.innerHTML = "";
  tbody.innerHTML = "";
  filteredData.forEach((row, index) => {
    console.log(filteredData);
    row.SNO = index + 1;
    const tr = document.createElement("tr");

    const tdContent = Object.values(row)
      .map((value) => {
        return `<td>${value}</td>`;
      })
      .join("");
    // console.log(tdContent);
    tr.innerHTML = tdContent;
    tbody.appendChild(tr);
    console.log(tbody);
  });
  const headings = Object.keys(filteredData[0]);
  thead.insertAdjacentHTML(
    "beforeend",
    headings.map((col) => `<th class="">${col}</th>`).join("")
  );
}

// Fetch data and populate dropdowns
fetchData().then((td) => {
  const tableData = td;
  const Driver_name = [];

  tableData.forEach((x, y) => {
    Driver_name.push(x.DriverName);
  });
  console.log("Driver_name", tableData);

  const Driver_Name_opt = [...new Set(Driver_name)];
  console.log(Driver_Name_opt);
  Driver_Name_opt.forEach((val) => {
    if (val === undefined) {
      DriverName_.setAttribute("disabled", "true");
    } else {
      DriverName_.removeAttribute("disabled");
      addOptionToDropdown(DriverName_, val);
    }
  });

  function addOptionToDropdown(dropdown, value) {
    const option = document.createElement("option");
    option.innerHTML = value;
    option.value = value;
    option.className = "option";
    dropdown.appendChild(option);
  }

  // Function to handle error message display
  function displayError(id, errMess) {
    const elem = document.getElementById(id);
    elem.innerHTML = "";
    elem.removeAttribute("class");

    setTimeout(() => {
      elem.innerHTML = errMess;
      elem.className = "Error";
    }, 200);
  }

  // Function to handle search functionality
  function searchRecords() {
    Search.innerHTML = `Search`;

    const value2 = DriverName_.value;

    if (DriverName_.hasAttribute("disabled", "true") === true) {
      displayError("err", "Values Not Found.. Please Contact Admin ");
      // setTimeout(() => location.reload(), 4000);
    } else {
      if (value2 === "") {
        // alert("Please select all given fields");
        displayError("err", "Please select all given fields...");
        return;
      }

      let filter;

      filter = orderedData(tableData, value2, "DriverName");

      if (filter.length > 0) {
        AddFilterinHtml(filter);
        document.getElementById("err").innerHTML = "";
        document.getElementById("err").removeAttribute("class");
      } else {
        thead.innerHTML = "";
        tbody.innerHTML = "";
        displayError("err", "No Record Found !");
      }
    }
  }

  Search.addEventListener("click", () => {
    Search.innerHTML = `Searching...  <i class="fa fa-spinner fa-spin"></i>`;
    setTimeout(searchRecords, 1000);
  });
});

// Menu-toggle button

$(document).ready(function () {
  $(".menu-icon").on("click", function () {
    $("nav ul").toggleClass("showing");
  });
});

// Scrolling Effect

$(window).on("scroll", function () {
  if ($(window).scrollTop()) {
    $("nav").addClass("black");
  } else {
    $("nav").removeClass("black");
  }
});
//----------------------------------------------------------------
var menuIcon = document.getElementById("menu");
var menu = document.querySelector(".menu-icon");
var overlay = document.querySelector(".overlay");
var close = document.querySelector(".close");
var RegForm_btn = document.getElementById("Reg_btnLink");
var Regbtn = document.getElementById("reg");
// var iframe = document.getElementById("Donar_reg_form");
var container = document.getElementById("container");
var iframe = document.getElementById("i_frame");

RegForm_btn.addEventListener("click", () => {
  // overlay.style.display = "block";

  container.style.display = "block";
  iframe.style.display = "none";
  overlay.style.display = "block";
  menu.click();
  setTimeout(() => {
    overlay.style.display = "none";
  }, 1500);
});

Regbtn.addEventListener("click", () => {
  document.getElementById("table-id").style.display = "none";
  container.style.display = "none";
  overlay.style.display = "block";
  menu.click();
  iframe.style.display = "block";
  setTimeout(() => {
    overlay.style.display = "none";
  }, 1500);
});
// overlay.addEventListener("click", () => {
//   overlay.style.display = "none";
//   iframe.style.display = "none";
// });
close.addEventListener("click", () => {
  overlay.style.display = "none";
  iframe.style.display = "none";
});

menu.addEventListener("click", () => {
  // element.classList.remove("fa-bars");
  menuIcon.classList.toggle("fa-times");
  menuIcon.classList.toggle("fa-bars");
});
