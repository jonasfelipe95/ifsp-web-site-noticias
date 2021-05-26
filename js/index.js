const loadPage = (page) => {
  console.log(page);

  getNews();
};

const getNews = () => {
  fetch("../database/news.json")
    .then((resp) => {
      return resp.json();
    })
    .then((resp) => {
      renderNews(resp)
    });
};

const renderNews = (news) => {
  const newsContainer = document.getElementById("news");

  const internalContainer = document.createElement("div");
  internalContainer.classList.add("container");
  
  const newsList = document.createElement("ul");
  newsList.classList.add("news-list");

  news.forEach((newsItem) => {
    const item = document.createElement("li");
    item.classList.add("news-card");

    const image = document.createElement("img");
    image.classList.add("news-image");
    image.setAttribute("src", newsItem.image);
    image.setAttribute("alt", newsItem.title);
    item.append(image);

    const title = document.createElement("div");
    title.classList.add("news-title");
    title.innerHTML = newsItem.title;
    item.append(title);

    const author = document.createElement("div");
    author.classList.add("news-author");
    author.innerHTML = newsItem.author;
    item.append(author);

    const category = document.createElement("div");
    category.classList.add("news-category");
    category.innerHTML = newsItem.category;
    item.append(category);

    const description = document.createElement("div");
    description.classList.add("news-text");
    description.innerHTML = newsItem.description;
    item.append(description);

    newsList.append(item);
  });

  internalContainer.append(newsList)
  newsContainer.append(internalContainer)
};
