document.addEventListener("DOMContentLoaded", () => {
  const recordForm = document.getElementById("recordForm");
  const recordList = document.getElementById("recordList");

  // Função para buscar registros do LocalStorage
  function getRecords() {
    return JSON.parse(localStorage.getItem("records")) || [];
  }

  // Função para salvar registros no LocalStorage
  function saveRecords(records) {
    localStorage.setItem("records", JSON.stringify(records));
  }

  // Função para exibir registros
  function displayRecords() {
    const records = getRecords();
    recordList.innerHTML = "";
    records.forEach((record, index) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
        <div>
          <strong>Nome:</strong> ${record.name} <br>
          <strong>Email:</strong> ${record.email}
        </div>
        <button class="btn btn-danger btn-sm" data-index="${index}">Excluir</button>
      `;
      recordList.appendChild(li);
    });
  }

  // Adicionar novo registro
  recordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (name === "" || email === "") return; // Validação adicional para garantir que não sejam adicionados registros vazios.

    const records = getRecords();
    records.push({ name, email });
    saveRecords(records);

    recordForm.reset();
    displayRecords();
  });

  // Excluir registro
  recordList.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-danger")) {
      const index = e.target.getAttribute("data-index");
      const records = getRecords();
      records.splice(index, 1);
      saveRecords(records);
      displayRecords();
    }
  });

  // Exibir registros ao carregar a página
  displayRecords();
});
