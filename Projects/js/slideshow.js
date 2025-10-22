/**
 * Picverse - Digital Art Community Platform
 * Slideshow JavaScript
 */

document.addEventListener("DOMContentLoaded", () => {
  // Slideshow functionality
  const slides = document.querySelectorAll(".slide")
  const indicators = document.querySelectorAll(".indicator")
  const prevBtn = document.querySelector(".prev-slide")
  const nextBtn = document.querySelector(".next-slide")

  if (slides.length === 0) return

  let currentSlide = 0
  const slideCount = slides.length

  // Function to show a specific slide
  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => {
      slide.classList.remove("active")
    })

    // Remove active class from all indicators
    indicators.forEach((indicator) => {
      indicator.classList.remove("active")
    })

    // Show the current slide and activate its indicator
    slides[index].classList.add("active")

    if (indicators[index]) {
      indicators[index].classList.add("active")
    }

    currentSlide = index
  }

  // Function to show the next slide
  function nextSlide() {
    let nextIndex = currentSlide + 1

    if (nextIndex >= slideCount) {
      nextIndex = 0
    }

    showSlide(nextIndex)
  }

  // Function to show the previous slide
  function prevSlide() {
    let prevIndex = currentSlide - 1

    if (prevIndex < 0) {
      prevIndex = slideCount - 1
    }

    showSlide(prevIndex)
  }

  // Event listeners for next and previous buttons
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide()
      resetSlideInterval() // Reset the interval when manually changing slides
    })
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide()
      resetSlideInterval() // Reset the interval when manually changing slides
    })
  }

  // Event listeners for indicators
  indicators.forEach((indicator) => {
    indicator.addEventListener("click", function () {
      const slideIndex = Number.parseInt(this.getAttribute("data-index"))
      showSlide(slideIndex)
      resetSlideInterval() // Reset the interval when manually changing slides
    })
  })

  // Auto-advance slides every 5 seconds
  let slideInterval = setInterval(nextSlide, 5000)

  // Function to reset the slide interval
  function resetSlideInterval() {
    clearInterval(slideInterval)
    slideInterval = setInterval(nextSlide, 5000)
  }

  // Pause auto-advance when hovering over slideshow
  const slideshowContainer = document.querySelector(".slideshow-container")

  if (slideshowContainer) {
    slideshowContainer.addEventListener("mouseenter", () => {
      clearInterval(slideInterval)
    })

    slideshowContainer.addEventListener("mouseleave", () => {
      slideInterval = setInterval(nextSlide, 5000)
    })
  }

  // Initialize the first slide
  showSlide(0)
})
