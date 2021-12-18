//  Variables
const tittle = document.querySelector("#tittle");
const author = document.querySelector("#author");
const isbn = document.querySelector("#isbn");
const btn = document.querySelector("#button");
const list = document.querySelector("#book-list");

//Book Class

class Book {
  constructor(tittle, author, isbn) {
    this.tittle = tittle;
    this.author = author;
    this.isbn = isbn;
  }
}
// Storage Class

class LS {
  static checkup() {
    let data;
    if (localStorage.getItem("list") === null) {
      data = [];
    } else {
      data = JSON.parse(localStorage.getItem("list"));
    }
    return data;
  }

  static addLocal(book) {
    const data = this.checkup();
    data.push(book);
    localStorage.setItem("list", JSON.stringify(data));
  }
  static loadLocal() {
    let data;
    if (localStorage.getItem("list") === null) {
      data = [];
    } else {
      data = JSON.parse(localStorage.getItem("list"));
    }
    data.forEach((element) => {
      UI.displayBook(element);
    });
  }

  static deleteLocal(e) {
    const isbn = e.target.parentElement.previousElementSibling.innerText;
    const data = this.checkup();
    data.forEach((element, index) => {
      if (element.isbn == isbn) {
        data.splice(index, 1);
        localStorage.setItem("list", JSON.stringify(data));
      }
    });
  }
}
//UI Class
class UI {
  static displayBook(book) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${book.tittle}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><i class="fas fa-trash-alt" role="button"></i></td> `;
    list.appendChild(tr);
    this.clearFields();
  }
  static clearFields() {
    tittle.value = "";
    author.value = "";
    isbn.value = "";
  }
  static deleteBook(e) {
    e.target.parentElement.parentElement.remove();
  }
}

//  Add Events
btn.addEventListener("click", (e) => {
  const book = new Book(tittle.value, author.value, isbn.value);
  UI.displayBook(book);
  LS.addLocal(book);
  e.preventDefault();
});

// Delete Event
list.addEventListener("click", (e) => {
  if (e.target.className === "fas fa-trash-alt") {
    UI.deleteBook(e);
    LS.deleteLocal(e);
  }
});

//Load Event
document.addEventListener("DOMContentLoaded", LS.loadLocal);
