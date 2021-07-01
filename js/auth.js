let loadingUser = true;
let logedUser;
let logedUserData;
let likedNews = [];

firebase.auth().onAuthStateChanged((user) => {
  if (!!user)
    db.collection("users")
      .where("userId", "==", user.uid)
      .get()
      .then((users) => {
        logedUserData = { ...users.docs[0].data(), id: users.docs[0].id };
      })
      .finally(async () => {
        loadingUser = false;
        logedUser = user;

        if (!!user) {
          likedNews = await getLikedNews();
        }
        renderLogedMenu();
        renderAuthButton();
        loadPage(categoryPage);
      });
  else {
    loadingUser = false;
    logedUser = user;
    renderLogedMenu();
    renderAuthButton();
    loadPage(categoryPage);
  }
});

const login = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      window.location.replace("noticias/favoritas.html");
    })
    .catch((error) => {
      console.error(error);
      alert("Usuário e/ou senha inválido(s)!!!");
    });
};

const logout = () => {
  firebase
    .auth()
    .signOut()
    .then((res) => {
      window.location.replace("/");
    });
};

const submitLogin = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Preencha todos os campos!");
    return;
  }

  login(email, password);
};

const getLikedNews = () => {
  return new Promise((resolve, reject) =>
    db
      .collection("news-likeds")
      .where("userId", "==", logedUser.uid)
      .get()
      .then((likedNewsList) => {
        resolve(
          likedNewsList.docs.map((newsLiked) => ({
            id: newsLiked.id,
            ...newsLiked.data(),
          }))
        );
      })
      .catch((error) => reject(error))
  );
};

const renderAuthButton = () => {
  if (!!logedUser) {
    document.getElementById("access-btn").style.display = "none";
    document.getElementById("access-btn").setAttribute("title", "Acessar");

    document.getElementById("logout-btn").style.display = "flex";
    document
      .getElementById("logout-btn")
      .setAttribute("title", logedUserData.name + ", Sair");

    document.getElementById("profile-initials").innerHTML = nameFormatter(
      logedUserData.name
    );
  } else {
    document.getElementById("logout-btn").style.display = "none";
    document.getElementById("access-btn").style.display = "flex";
  }
};

const nameFormatter = (name) => {
  if (!name) return "";
  const splitName = name.trim().split(" ");
  return (
    splitName[0][0] +
    (splitName.length > 1
      ? splitName[splitName.length - 1][0]
      : splitName[0][1] || "")
  );
};

const loadLoginPage = () => {
  setTimeout(() => {
    if (!!logedUser) {
      window.location.replace("../noticias/favoritas.html");
    }
  }, 500);
};

const renderLogedMenu = () => {
  if (!!logedUser) {
    document.getElementById("favorites-link").classList.add("show");
    document.getElementById("favorites-link").classList.remove("hidden");

    if (logedUserData.type === "admin") {
      document.getElementById("register-link").classList.add("show");
      document.getElementById("register-link").classList.remove("hidden");
    }
  } else {
    document.getElementById("favorites-link").classList.remove("show");
    document.getElementById("favorites-link").classList.add("hidden");

    document.getElementById("register-link").classList.remove("show");
    document.getElementById("register-link").classList.add("hidden");
  }
};
