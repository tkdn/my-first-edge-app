type Content = {
  message: string;
  createdAt: string;
}

export async function bbsApp() {
  const res = await fetch("/api/message");
  const { contents } = await res.json();
  const $list = document.getElementById("message-list")
  const $fragment = document.createDocumentFragment();
  contents.forEach(({ message, createdAt }: Content) => {
    const $li = document.createElement("li");
    $li.innerHTML = `${message} ${new Date(createdAt).toLocaleString()}`
    $fragment.appendChild($li);
  });
  $list!.innerHTML = "";
  $list?.appendChild($fragment);
}

export async function messageApp() {
  const $form = document.getElementById("bss");
  const $textarea = $form?.querySelector("textarea");
  const $button = $form?.querySelector<HTMLInputElement>("input[type=submit]");

  $form!.addEventListener("submit", async (event) => {
    event.preventDefault();
    $button!.disabled = true;

    await fetch("/api/message", {
      method: "POST",
      body: JSON.stringify({
        message: $textarea?.value
      })
    })

    await bbsApp();

    $textarea!.value = "";
    $button!.disabled = false;
  });
}
