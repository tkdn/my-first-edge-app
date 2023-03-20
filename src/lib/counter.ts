export async function counterApp() {
  const $app = document.getElementById("counter");
  const $fragment = document.createDocumentFragment();

  const res = await fetch("/api/counter");
  const { counter } = await res.json();
  const visitCount = (counter as number).toString();
  const displayCount = visitCount.padStart(6, "0");

  displayCount.split("").forEach((count) => {
    const $span = document.createElement("span");
    $span.innerHTML = count;
    $span.className = `count-${count}`;
    $fragment.appendChild($span);
  });

  $app!.appendChild($fragment);
}
