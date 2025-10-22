/**
 * Picverse - Digital Art Community Platform
 * Submission Page JavaScript
 */

document.addEventListener("DOMContentLoaded", () => {
  const submissionForm = document.getElementById("submission-form")
  const successMessage = document.querySelector(".submission-success")
  const fileUpload = document.getElementById("artwork-file")
  const filePreview = document.querySelector(".file-preview")
  const tagCheckboxes = document.querySelectorAll('input[name="tags[]"]')

  // File upload preview
  if (fileUpload && filePreview) {
    fileUpload.addEventListener("change", function () {
      const file = this.files[0]

      if (file) {
        const reader = new FileReader()

        reader.onload = (e) => {
          const img = document.createElement("img")
          img.src = e.target.result

          // Clear previous preview
          filePreview.innerHTML = ""
          filePreview.appendChild(img)
        }

        reader.readAsDataURL(file)
      }
    })
  }

  // Limit tag selection to 3
  if (tagCheckboxes.length > 0) {
    tagCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        const checkedTags = document.querySelectorAll('input[name="tags[]"]:checked')

        if (checkedTags.length > 3) {
          this.checked = false
          alert("You can select a maximum of 3 tags.")
        }
      })
    })
  }

  // Form submission
  if (submissionForm) {
    submissionForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Validate form
      let isValid = true
      const requiredFields = submissionForm.querySelectorAll("[required]")

      // Remove any existing error messages
      const errorMessages = submissionForm.querySelectorAll(".error-message")
      errorMessages.forEach((msg) => msg.remove())

      // Check each required field
      requiredFields.forEach((field) => {
        if (!field.value.trim() && field.type !== "file" && field.type !== "checkbox" && field.type !== "radio") {
          isValid = false
          const errorMessage = document.createElement("span")
          errorMessage.className = "error-message"
          errorMessage.textContent = "This field is required."

          field.parentNode.appendChild(errorMessage)
          field.style.borderColor = "var(--error-color)"
        } else if (field.type === "file" && !field.files[0]) {
          isValid = false
          const errorMessage = document.createElement("span")
          errorMessage.className = "error-message"
          errorMessage.textContent = "Please upload an image file."

          field.parentNode.parentNode.appendChild(errorMessage)
        } else if (field.type === "checkbox" && !field.checked) {
          isValid = false
          const errorMessage = document.createElement("span")
          errorMessage.className = "error-message"
          errorMessage.textContent = "You must agree to the terms and conditions."

          field.parentNode.appendChild(errorMessage)
        } else if (field.type === "radio") {
          const radioGroup = document.querySelectorAll(`input[name="${field.name}"]:checked`)
          if (radioGroup.length === 0) {
            isValid = false
            const errorMessage = document.createElement("span")
            errorMessage.className = "error-message"
            errorMessage.textContent = "Please select an option."

            field.parentNode.parentNode.parentNode.appendChild(errorMessage)
          }
        } else {
          field.style.borderColor = "var(--border-color)"
        }
      })

      // If form is valid, show success message
      if (isValid) {
        // Show popup notification
        const notification = document.createElement("div")
        notification.className = "popup-notification"
        notification.innerHTML = `
    <i class="fas fa-check-circle"></i>
    Your artwork has been submitted successfully!
    <button class="close-btn" onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `
        document.body.appendChild(notification)

        // Show the notification with animation
        setTimeout(() => {
          notification.classList.add("show")
        }, 100)

        // Auto-hide the notification after 5 seconds
        setTimeout(() => {
          if (notification.parentElement) {
            notification.classList.remove("show")
            setTimeout(() => {
              if (notification.parentElement) {
                notification.remove()
              }
            }, 500)
          }
        }, 5000)

        // Hide the form and show success message
        submissionForm.style.display = "none"
        if (successMessage) {
          successMessage.style.display = "block"
        }

        // In a real application, you would submit the form data to a server here
        console.log("Form submitted successfully")
      }
    })
  }
})
