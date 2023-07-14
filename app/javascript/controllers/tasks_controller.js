import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    console.log(this.element)
  }

  toggle(e) {
    const id = e.target.dataset.id
    const csrfToken = document.querySelector("meta[name='csrf-token']").content

    fetch(`/tasks/${id}/toggle`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "X-CSRF-Token": csrfToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ completed: e.target.checked })
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message)
      })
  }

  delete(e) {
    const confirmed = confirm("Are you sure you want to delete this task?")

    if (!confirmed) {
      e.preventDefault()
  }
}
