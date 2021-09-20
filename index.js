const darkBtn = document.querySelector(".darkBtn");
const darkIcon = document.querySelector(".darkBtn i");

const isUserColorTheme = localStorage.getItem("color-theme");
const isOsColorTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const getUserTheme = () => { isUserColorTheme ? isUserColorTheme : isOsColorTheme };

window.onload = function () {
  if (isUserColorTheme === "dark") {
    localStorage.setItem('color-theme', 'dark');
    document.documentElement.setAttribute('color-theme', 'dark');
    darkIcon.style.color = "#FFFF00";
  } else {
    localStorage.setItem('color-theme', 'light');
    document.documentElement.setAttribute('color-theme', 'light');
    darkIcon.style.color = "#505050";
  }
};

const handleDark = (event) => {
    const { color } = event.target.style;
    if(color === "rgb(255, 255, 0)") {
        event.target.style.color = "#505050";
        localStorage.setItem("color-theme", "light");
        document.documentElement.setAttribute('color-theme', 'light');
    } else {
        event.target.style.color = "#FFFF00";
        localStorage.setItem("color-theme", "dark");
        document.documentElement.setAttribute('color-theme', 'dark');
    }
}

darkBtn.addEventListener("click", handleDark);