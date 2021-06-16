const onLoadNewsDetail = async () => {
  const newsId = Object.fromEntries(
    new URLSearchParams(window.location.search).entries()
  ).id;

  try {
    const news = await getNewsById(newsId);
    mountNewsDetail(news);
  } catch (error) {
    const loadingContainer = document.getElementById("loading-container");

    const notFoundContainer = document.getElementById("not-found-container");

    loadingContainer.classList.remove("show");
    loadingContainer.classList.add("hidden");

    notFoundContainer.classList.remove("hidden");
    notFoundContainer.classList.add("show");

    console.error(e);
  }
};

const getNewsById = async (id) => {
  return db
    .collection("news")
    .doc(id)
    .get()
    .then((news) => news.data());
};

const mountNewsDetail = (news) => {
  const image = document.getElementById("news-image");

  const title = document.getElementById("news-title");

  const subtitle = document.getElementById("news-subtitle");

  const date = document.getElementById("news-date");

  const authors = document.getElementById("news-author");

  const category = document.getElementById("news-category");

  const description = document.getElementById("news-text");

  image.setAttribute("src", news.image);
  image.setAttribute("alt", news.title);

  title.innerHTML = news.title;

  subtitle.innerHTML = news.subtitle;

  authors.innerHTML = news.authors;

  category.innerHTML = categoriesTranslate[news.category.toUpperCase()];

  description.innerHTML = news.description;

  date.innerHTML = new Date(news?.date?.seconds * 1000).toLocaleDateString();

  showNewsDetail();
};

const showNewsDetail = () => {
  const loadingContainer = document.getElementById("loading-container");

  const newsContainer = document.getElementById("news-container");

  loadingContainer.classList.remove("show");
  loadingContainer.classList.add("hidden");

  newsContainer.classList.remove("hidden");
  newsContainer.classList.add("show");
};
