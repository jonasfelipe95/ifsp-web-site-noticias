let searchTimeout;
let searchInput;
let categoryPage;

const categories = {
  EDUCATION: "education",
  FINANCES: "finances",
  POLITICS: "politics",
  HEALTH: "health",
  TECNOLOGY: "tecnology",
  NEWS: "news",
};

const categoriesTranslate = {
  EDUCATION: "Educação",
  FINANCES: "Finanças",
  POLITICS: "Política",
  HEALTH: "Saúde",
  TECNOLOGY: "Tecnologia",
  NEWS: "Notícias",
};

const loadPage = async (category) => {
  searchInput = document.getElementById("search-input");
  categoryPage = category;

  try {
    const newsListHandled = await getNewsList(category);
    const scrambledNewsList = await shuffleNewsList(newsListHandled);

    renderNewsList(scrambledNewsList, category);
  } catch (error) {
    console.error(error);
  }
};

const getNewsList = async (category) => {
  if (category === categories.NEWS) {
    return db
      .collection("news")
      .orderBy("title")
      .startAt(searchInput.value || "")
      .endAt((searchInput.value || "") + "\uf8ff")
      .get()
      .then((newsList) =>
        newsList.docs.map((news) => ({
          id: news.id,
          ...news.data(),
        }))
      );
  } else {
    return db
      .collection("news")
      .orderBy("title")
      .where("category", "==", category)
      .startAt(searchInput.value || "")
      .endAt((searchInput.value || "") + "\uf8ff")
      .get()
      .then((newsList) =>
        newsList.docs.map((news) => ({
          id: news.id,
          ...news.data(),
        }))
      );
  }
};

const shuffleNewsList = (newsList) => {
  let randomIndex;

  for (let i = newsList.length; i !== 0; i--) {
    randomIndex = Math.floor(Math.random() * i);

    [newsList[i - 1], newsList[randomIndex]] = [
      newsList[randomIndex],
      newsList[i - 1],
    ];
  }

  return newsList;
};

const renderNewsList = (newsList, category) => {
  const newsContainer = document.getElementById("news");

  const internalContainer = document.createElement("div");
  internalContainer.classList.add("container");

  const newsListElement = document.createElement("ul");

  newsList.forEach((news) => {
    newsListElement.append(mountNews(news, category));
  });

  if (!newsList.length) {
    const text = document.createElement("p");
    text.classList.add("news-empty");
    text.innerHTML = "Nenhuma notícia encontrada";
    newsListElement.append(text);
  }

  internalContainer.append(newsListElement);
  newsContainer.innerHTML = "";
  newsContainer.append(internalContainer);
};

const mountNews = (news, category) => {
  const item = document.createElement("li");
  item.classList.add("news-card");

  const image = document.createElement("img");
  image.classList.add("news-image");
  image.setAttribute("src", news.image);
  image.setAttribute("alt", news.title);
  item.append(image);

  const title = document.createElement("h2");
  title.classList.add("news-title");
  title.innerHTML = news.title;
  item.append(title);

  const subtitle = document.createElement("h3");
  subtitle.classList.add("news-subtitle");
  subtitle.innerHTML = news.subtitle;
  item.append(subtitle);

  const categoryElement = document.createElement("div");
  categoryElement.classList.add("news-category");
  categoryElement.innerHTML = categoriesTranslate[news.category.toUpperCase()];
  item.append(categoryElement);

  const author = document.createElement("div");
  author.classList.add("news-author");
  author.innerHTML = news.authors;
  item.append(author);

  const description = document.createElement("div");
  description.classList.add("news-text");
  description.innerHTML = news.description;
  item.append(description);

  const date = document.createElement("span");
  date.classList.add("news-date");
  date.innerHTML = new Date(news?.date?.seconds * 1000).toLocaleDateString();
  item.append(date);

  const readMoreLink = document.createElement("a");
  readMoreLink.classList.add("news-read-more");
  readMoreLink.setAttribute(
    "href",
    (category === categories.NEWS
      ? "./noticias/noticia.html"
      : "./noticia.html") +
      "?id=" +
      news.id
  );
  readMoreLink.innerHTML = "Ler mais...";
  item.append(readMoreLink);

  return item;
};

const onInputSearch = (e) => {
  if (!!searchTimeout) {
    clearTimeout(searchTimeout);
  }

  searchTimeout = setTimeout(() => {
    loadPage(categoryPage);
  }, 1000);
};
