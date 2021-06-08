const videoContainer = document.getElementById("videoContainer")
const form = document.getElementById("commentForm")
const textarea = form.querySelector("textarea")
const btn = form.querySelector("button")

const handleSubmit = (event) => {
    event.preventDefault()
    const text = textarea.value
    const video = videoContainer.dataset.id
    if(text === ""){
        return
    }
    fetch(`/api/videos/${video}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    })
    textarea.value = ""
}

form.addEventListener("submit", handleSubmit)