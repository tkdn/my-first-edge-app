import "./style.css";

(async () => {
  const res = await fetch("/api/counter");
  const { counter } = await res.json();
  const $app = document.getElementById("app");
  $app!.innerHTML = counter;
})();
