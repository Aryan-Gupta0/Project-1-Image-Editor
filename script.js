let filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"

    },

    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"

    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 200,
        unit: "deg"
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    }
}

const filterContainer = document.querySelector(".filters")
const imageCanvas = document.querySelector("#image-canvas")
const imgInput = document.querySelector("#input-image")
const canvasCtx = imageCanvas.getContext("2d")
const reset = document.querySelector("#reset")
const download = document.querySelector("#download")
const presetsContainer = document.querySelector(".presets")
let file = null
let image = null

function createFilterElement(name, unit, value, min, max) {
    div = document.createElement("div")
    div.classList.add("filter")

    const p = document.createElement("p")
    p.innerText = name

    const input = document.createElement("input")
    input.type = "range"
    input.min = min
    input.max = max
    input.value = value
    input.unit = unit
    input.id = name

    div.appendChild(p)
    div.appendChild(input)

    input.addEventListener("input", (event) => {
        filters[name].value = input.value
        applyFilters()

    })

    return div
}

function createFilters(){
Object.keys(filters).forEach(key => {

    const filterElements = createFilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max)

    filterContainer.appendChild(filterElements)
})
}

createFilters()



imgInput.addEventListener("change", (event) => {

    imageCanvas.style.display = "block"

    const imgPlaceholder = document.querySelector(".placeholder")
    imgPlaceholder.style.display = "none"

    file = event.target.files[0]
    const img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload = () => {
        image = img
        imageCanvas.width = img.width
        imageCanvas.height = img.height
        canvasCtx.drawImage(img, 0, 0)
    }

})

function applyFilters() {
    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height)
    canvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
    `.trim()
    canvasCtx.drawImage(image, 0, 0)
}

reset.addEventListener("click" , ()=>{
    filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"

    },

    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"

    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 200,
        unit: "deg"
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    }
}
applyFilters()
filterContainer.innerHTML = ""
createFilters()
})

download.addEventListener("click",()=>{
    const link = document.createElement("a")
    link.download = "edited-image.png"
    link.href = imageCanvas.toDataURL()
    link.click()
})


const presets = {
  original: {
    brightness: 100, contrast: 100, saturation: 100,
    hueRotation: 0, blur: 0, grayscale: 0,
    sepia: 0, invert: 0, opacity: 100
  },

  vintage: {
    brightness: 110, contrast: 120, saturation: 90,
    hueRotation: 5, blur: 0, grayscale: 10,
    sepia: 40, invert: 0, opacity: 100
  },

  retro: {
    brightness: 105, contrast: 130, saturation: 85,
    hueRotation: 350, blur: 0, grayscale: 0,
    sepia: 30, invert: 0, opacity: 100
  },

  oldSchool: {
    brightness: 95, contrast: 110, saturation: 80,
    hueRotation: 10, blur: 1, grayscale: 0,
    sepia: 50, invert: 0, opacity: 100
  },

  noir: {
    brightness: 90, contrast: 150, saturation: 0,
    hueRotation: 0, blur: 0, grayscale: 100,
    sepia: 0, invert: 0, opacity: 100
  },

  faded: {
    brightness: 115, contrast: 90, saturation: 70,
    hueRotation: 0, blur: 0, grayscale: 20,
    sepia: 20, invert: 0, opacity: 95
  },

  cinematic: {
    brightness: 110, contrast: 140, saturation: 100,
    hueRotation: 15, blur: 0, grayscale: 0,
    sepia: 10, invert: 0, opacity: 100
  },

  dreamy: {
    brightness: 120, contrast: 100, saturation: 120,
    hueRotation: 330, blur: 2, grayscale: 0,
    sepia: 10, invert: 0, opacity: 100
  },

  warm: {
    brightness: 110, contrast: 115, saturation: 120,
    hueRotation: 15, blur: 0, grayscale: 0,
    sepia: 25, invert: 0, opacity: 100
  },

  cool: {
    brightness: 100, contrast: 115, saturation: 110,
    hueRotation: 200, blur: 0, grayscale: 0,
    sepia: 0, invert: 0, opacity: 100
  },

  blackAndWhite: {
    brightness: 100, contrast: 130, saturation: 0,
    hueRotation: 0, blur: 0, grayscale: 100,
    sepia: 0, invert: 0, opacity: 100
  },

  polaroid: {
    brightness: 115, contrast: 125, saturation: 115,
    hueRotation: 5, blur: 0, grayscale: 0,
    sepia: 30, invert: 0, opacity: 100
  }
};


Object.keys(presets).forEach(key => {
    presetsButton = document.createElement("button")
    presetsButton.classList.add("btn")
    presetsButton.innerText = key
    presetsContainer.appendChild(presetsButton)

    presetsButton.addEventListener("click" , ()=>{
        const preset = presets[key]
        Object.keys(preset).forEach(filterName =>{
            filters[filterName].value = preset[filterName]
        })
        applyFilters()
        filterContainer.innerHTML = ""
        createFilters()
    })
})

