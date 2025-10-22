/**
 * Picverse - Digital Art Community Platform
 * Gallery JavaScript
 */

document.addEventListener("DOMContentLoaded", () => {
  // Gallery tag filtering
  const tagButtons = document.querySelectorAll(".tag-btn")
  const gallerySections = document.querySelectorAll(".gallery-section")

  if (tagButtons.length > 0) {
    tagButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        tagButtons.forEach((btn) => {
          btn.classList.remove("active")
        })

        // Add active class to clicked button
        this.classList.add("active")

        // Get the tag to filter by
        const tag = this.getAttribute("data-tag")

        // Hide all gallery sections
        gallerySections.forEach((section) => {
          section.classList.add("hidden")
        })

        // Show the selected gallery section
        document.getElementById(tag).classList.remove("hidden")
      })
    })
  }

  // Artwork modal functionality
  const artworkCards = document.querySelectorAll(".artwork-card")
  const modal = document.getElementById("artwork-modal")
  const closeModal = document.querySelector(".close-modal")
  const modalImg = document.getElementById("modal-img")
  const modalTitle = document.getElementById("modal-title")
  const modalArtist = document.getElementById("modal-artist")
  const modalLikes = document.getElementById("modal-likes")
  const modalComments = document.getElementById("modal-comments")
  const modalDescription = document.getElementById("modal-description")
  const modalTags = document.getElementById("modal-tags")

  // Sample artwork data (in a real application, this would come from a database)
  const artworkData = {
    dp1: {
      title: "Colorful Fall",
      artist: "Ozgun Evren Erturk",
      image: "File Gambar/Abstrak Art/Gambar 1.webp",
      likes: 1702,
      comments: 32,
      description:
        "Colours Fall portrays a cascade of vibrant hues, blending warmth and coolness in a fluid descent. The piece evokes movement and transformation, capturing the beauty of change.",
      tags: ["Abstract", "Colorful", "Digital"],
    },
    dp2: {
      title: "Etheral Waves",
      artist: "Rachel Anne",
      image: "File Gambar/Abstrak Art/Gambar 2.jpg",
      likes: 189,
      comments: 24,
      description:
        "An abstract interpretation of ocean waves and underwater scenes. This piece explores the fluidity and movement of water through abstract forms.",
      tags: ["Abstract", "Blue", "Fluid"],
    },
    dp3: {
      title: "Inner Pulse",
      artist: "Olivia Norren",
      image: "File Gambar/Abstrak Art/Gambar 3.jpg",
      likes: 312,
      comments: 45,
      description:
        "An abstract landscape inspired by sunset views over a valley. The warm colors and flowing shapes create a sense of peace and tranquility.",
      tags: ["Abstract", "Landscape", "Warm"],
    },
    ca1: {
      title: "Fragmented Reality",
      artist: "Irynne Yulviana",
      image: "File Gambar/Minimalism Art/Art1.jpg",
      likes: 278,
      comments: 36,
      description:
        "A minimalist composition focusing on clean lines and negative space. This piece demonstrates how simplicity can create powerful visual impact.",
      tags: ["Minimalist", "Geometric", "Clean"],
    },
    il1: {
      title: "Whispers in Blue",
      artist: "Ara Ivanna",
      image: "File Gambar/PopArt/PopArt 1.jpg",
      likes: 156,
      comments: 18,
      description:
        "A vibrant pop art portrait inspired by classic comic book styles and contemporary pop culture. Bold colors and strong lines create a striking visual statement.",
      tags: ["Pop Art", "Portrait", "Colorful"],
    },
  }

  // Open modal when clicking on an artwork card
  if (artworkCards.length > 0) {
    artworkCards.forEach((card) => {
      card.addEventListener("click", function () {
        const artworkId = this.getAttribute("data-id")
        const artwork = artworkData[artworkId]

        if (artwork) {
          // Populate modal with artwork data
          modalImg.src = artwork.image
          modalTitle.textContent = artwork.title
          modalArtist.textContent = "by " + artwork.artist
          modalLikes.textContent = artwork.likes
          modalComments.textContent = artwork.comments
          modalDescription.textContent = artwork.description

          // Clear and populate tags
          modalTags.innerHTML = ""
          artwork.tags.forEach((tag) => {
            const tagElement = document.createElement("span")
            tagElement.className = "tag"

            // Assign a color class based on the tag
            if (tag.includes("Abstract")) {
              tagElement.classList.add("tag-abstract")
            } else if (tag.includes("Minimalist")) {
              tagElement.classList.add("tag-minimalist")
            } else if (tag.includes("Pop Art")) {
              tagElement.classList.add("tag-popart")
            } else {
              // Default tag style
              tagElement.classList.add("tag-abstract")
            }

            tagElement.textContent = "#" + tag.replace(" ", "")
            modalTags.appendChild(tagElement)
          })

          // Show the modal
          modal.style.display = "block"
          document.body.style.overflow = "hidden" // Prevent scrolling
        } else {
          // If artwork data is not found, use the card's own information
          const imgSrc = this.querySelector("img").src
          const title = this.querySelector("h3").textContent
          const artist = this.querySelector(".artist").textContent

          modalImg.src = imgSrc
          modalTitle.textContent = title
          modalArtist.textContent = artist
          modalLikes.textContent = Math.floor(Math.random() * 300) + 50
          modalComments.textContent = Math.floor(Math.random() * 50) + 5
          modalDescription.textContent =
            "This is a sample description for the artwork. In a real application, this would be fetched from a database."

          // Add some default tags
          modalTags.innerHTML = ""
          const tagElement = document.createElement("span")

          if (this.closest(".gallery-section").id === "abstract") {
            tagElement.className = "tag tag-abstract"
            tagElement.textContent = "#Abstract"
          } else if (this.closest(".gallery-section").id === "minimalist") {
            tagElement.className = "tag tag-minimalist"
            tagElement.textContent = "#Minimalist"
          } else if (this.closest(".gallery-section").id === "popart") {
            tagElement.className = "tag tag-popart"
            tagElement.textContent = "#PopArt"
          }

          modalTags.appendChild(tagElement)

          // Show the modal
          modal.style.display = "block"
          document.body.style.overflow = "hidden" // Prevent scrolling
        }
      })
    })
  }

  // Close modal when clicking the close button
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none"
      document.body.style.overflow = "auto" 
    })
  }

  // Close modal when clicking outside the modal content
  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none"
        document.body.style.overflow = "auto" // Re-enable scrolling
      }
    })
  }
})
