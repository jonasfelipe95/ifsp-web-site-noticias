const sendContact = (contact) => {
  return db
    .collection("contacts")
    .add(contact)
    .then((res) => {
      alert("Contato enviado com sucesso!");
      clearForm();
    });
};

const clearForm = () => {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("description").value = "";
};

const getContactData = () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const subject = document.getElementById("subject").value;
  const description = document.getElementById("description").value;

  return { name, email, phone, subject, description };
};

const submitContact = () => {
  sendContact(getContactData());
};
