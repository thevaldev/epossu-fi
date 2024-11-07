const Themes = {
  /**
   * init the theme
   */
  initTheme() {
    const theme = this.getTheme();
    if (theme == "light") this.setLightTheme();
    else if (theme == "dark") this.setDarkTheme();
  },

  getTheme() {
    let theme = "light";

    if (localStorage.getItem("theme") == null) {
      // get browser theme
      if (window.matchMedia("(prefers-color-scheme: dark)").matches)
        theme = "dark";
      else theme = "light";
    } else theme = localStorage.getItem("theme") ?? "light";

    return theme;
  },

  /**
   * Save the theme to local storage
   * @param theme
   */
  saveTheme(theme: string) {
    localStorage.setItem("theme", theme);
  },

  /**
   * Set the light theme
   */
  setLightTheme() {
    document.body.classList.add("light");
    document.documentElement.style.setProperty("--color-3", "#333c45");
    document.documentElement.style.setProperty("--color-6", "#404b56");
    document.documentElement.style.setProperty("--container", "#fafafa");
    document.documentElement.style.setProperty("--primary", "#ff7c5a");
    document.documentElement.style.setProperty("--primary2", "#ff6841");
    document.documentElement.style.setProperty(
      "--color-chart-cursor",
      "rgba(0, 0, 0, 0.07)"
    );
    document.documentElement.style.setProperty(
      "--color-chart-cursor-2",
      "rgba(0, 0, 0, 0.9)"
    );
    document.documentElement.style.setProperty("--background", "#f3f4f4");
  },
  /**
   * Set the dark theme
   */
  setDarkTheme() {
    document.body.classList.remove("light");
    document.documentElement.style.setProperty("--color-3", "#f8fafb");
    document.documentElement.style.setProperty("--color-6", "#ccc");
    document.documentElement.style.setProperty("--container", "#171c21");
    document.documentElement.style.setProperty("--primary", "#ff9073");
    document.documentElement.style.setProperty("--primary2", "#ff7c5a");
    document.documentElement.style.setProperty(
      "--color-chart-cursor",
      "rgba(255, 255, 255, 0.05)"
    );
    document.documentElement.style.setProperty(
      "--color-chart-cursor-2",
      "rgba(255, 255, 255, 0.4)"
    );
    document.documentElement.style.setProperty("--background", "#1e242a");
  },
};

export default Themes;
