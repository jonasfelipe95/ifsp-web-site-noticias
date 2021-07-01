const sendNews = (news) => {
  return db
    .collection("news")
    .add(news)
    .then((res) => {
      alert("Notícia criada com sucesso!");
      clearForm();
    });
};

const clearForm = () => {
  document.getElementById("title").value = "";
  document.getElementById("sub-title").value = "";
  document.getElementById("category").value = "";
  document.getElementById("date").value = "";
  document.getElementById("image-url").value = "";
  document.getElementById("authors").value = "";
  document.getElementById("description").value = "";
  document.getElementById("link").value = "";
};

const getNewsData = () => {
  const title = document.getElementById("title").value;
  const subtitle = document.getElementById("sub-title").value;
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;
  const image = document.getElementById("image-url").value;
  const link = document.getElementById("link").value;
  const authors = document.getElementById("authors").value;
  const description = document.getElementById("description").value;

  return {
    title,
    subtitle,
    category,
    link,
    date: new Date(
      new Date(date).toISOString().split("T")[0] + "T12:00:00.000Z"
    ),
    image,
    authors,
    description,
  };
};

const submitNews = () => {
  sendNews(getNewsData());
};
