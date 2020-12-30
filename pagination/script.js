let container = document.createElement("div");
container.setAttribute("class", "container");
document.body.appendChild(container);

let maintable = document.createElement("table");
maintable.setAttribute("id", "table");
let thead = document.createElement("thead");
let tbody = document.createElement("tbody");
tbody.setAttribute("id", "tbody");
let tr = document.createElement("tr");
let th1 = document.createElement("th");
th1.setAttribute("class", "idpadding")
let th2 = document.createElement("th");
let th3 = document.createElement("th");
th1.innerText = "Id";
th2.innerText = "Name";
th3.innerText = "Email";
container.appendChild(maintable);
thead.append(th1, th2, th3);
table.appendChild(thead);
table.appendChild(tbody);


let pagination = document.createElement("div");
pagination.setAttribute("id", "pagination-wrapper")
pagination.setAttribute("class", "pagination")
container.append(pagination);

// function


function createtr(id, name, email) {
  let tr = document.createElement("tr");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");

  td1.innerHTML = id;
  td2.innerHTML = name;
  td3.innerHTML = email;
  tr.append(td1, td2, td3, );
  tbody.append(tr);
}

function elements(text, run) {
  let a = document.createElement("a");
  a.setAttribute("href", "#");
  a.setAttribute("onclick", run)
  a.innerText = text;
  return a;
}



let request = new XMLHttpRequest();

request.open("GET", "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json", true);

request.send();

request.onload = function() {
  let tabledata = JSON.parse(this.response);

  let state = {
    "queryset": tabledata,
    "page": 1,
    "rows": 10,
    "window": 10
  }

  buildTable()

  function pagination(queryset, page, rows) {
    let trimStart = (page - 1) * rows;
    let trimEnd = trimStart + rows;
    let trimedData = queryset.slice(trimStart, trimEnd)
    let pages = Math.ceil(tabledata.length / rows);
    return {
      "queryset": trimedData,
      "pages": pages
    }
  }



  function pageButtons(pages) {
    let wrapper = document.getElementById("pagination-wrapper");
    wrapper.innerHTML = "";
    let maxLeft = (state.page - Math.floor(state.window / 2));
    let maxRight = (state.page + Math.floor(state.window / 2));
    if (maxLeft < 1) {
      maxLeft = 1
      maxRight = state.window
    }
    if (maxRight > pages) {
      maxLeft = pages - (state.window - 1)
      maxRight = pages
      if (maxLeft < 1) {
        maxLeft = 1;

      }
    }
    for (let page = maxLeft; page <= maxRight; page++) {
      wrapper.innerHTML = wrapper.innerHTML + `<button value="${page}" class="btn">${page}</button>`

    }
    if (state.page !== 1) {
      wrapper.innerHTML = `<button value=${1} class="btn">&#171; First</button>` + wrapper.innerHTML
    }
    if (state.page != pages) {
      wrapper.innerHTML += `<button value=${pages} class="btn">Last &#187;</button>`
    }
    let dynamic = document.getElementById("pagination-wrapper")
    dynamic.addEventListener("click", function(e) {
      document.getElementById("tbody").innerHTML = ""
      state.page = Number(e.target.value)
      console.log(state.page);
      buildTable()
    })

  }

  function buildTable() {
    let data = pagination(state.queryset, state.page, state.rows)
    let print = data.queryset
    for (let i = 0; i < print.length; i++) {
      createtr(print[i].id, print[i].name, print[i].email);
    }
    pageButtons(data.pages)
  }
}
