(async function () {
  const out = await api.post("/auth/logout");

  console.log(out);
  console.log(out.status);

  if (out.status == 204) {
    trivExitPage("splash_screen_login_page_splash_screen.html", true);
    Object.keys(window).forEach((k) => {
      if (k.startsWith("Var")) {
        try {
          window[k].set(window[k].getDefault());
        } catch (e) {}
      }
    });
    localStorage.clear();
    sessionStorage.clear();
  }
})();
