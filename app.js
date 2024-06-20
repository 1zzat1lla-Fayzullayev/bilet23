document.addEventListener('DOMContentLoaded', function () {
	const datePickerToggle = document.getElementById('datePickerToggle')
	const calendar = document.getElementById('calendar')
	const closeCalendarModal = document.getElementById('closeCalendarModal')
	const priceButton = document.getElementById('priceButton')
	const priceRangeModal = document.getElementById('priceRangeModal')
	const closePriceRangeModal = document.getElementById('closePriceRangeModal')

	datePickerToggle.addEventListener('click', function () {
		calendar.classList.toggle('hidden')
	})

	closeCalendarModal.addEventListener('click', function () {
		calendar.classList.add('hidden')
	})

	priceButton.addEventListener('click', function () {
		priceRangeModal.style.display = 'block'
	})

	closePriceRangeModal.addEventListener('click', function () {
		priceRangeModal.style.display = 'none'
	})

	window.onclick = function (event) {
		if (event.target === priceRangeModal) {
			priceRangeModal.style.display = 'none'
		}
	}

	// Other functionality and event listeners...
})

// Slider control functions (keeping these as they were in your original script)
const fromSlider = document.getElementById('fromSlider')
const toSlider = document.getElementById('toSlider')
const fromInput = document.getElementById('fromInput')
const toInput = document.getElementById('toInput')

function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
	const [from, to] = getParsed(fromInput, toInput)
	fillSlider(fromInput, toInput, '#F71313', '#F71313', controlSlider)
	if (from > to) {
		fromSlider.value = to
		fromInput.value = to
	} else {
		fromSlider.value = from
	}
}

function controlToInput(toSlider, fromInput, toInput, controlSlider) {
	const [from, to] = getParsed(fromInput, toInput)
	fillSlider(fromInput, toInput, '#F71313', '#F71313', controlSlider)
	setToggleAccessible(toInput)
	if (from <= to) {
		toSlider.value = to
		toInput.value = to
	} else {
		toInput.value = from
	}
}

function controlFromSlider(fromSlider, toSlider, fromInput) {
	const [from, to] = getParsed(fromSlider, toSlider)
	fillSlider(fromSlider, toSlider, '#909090', '#F71313', toSlider)
	if (from > to) {
		fromSlider.value = to
		fromInput.value = to
	} else {
		fromInput.value = from
	}
}

function controlToSlider(fromSlider, toSlider, toInput) {
	const [from, to] = getParsed(fromSlider, toSlider)
	fillSlider(fromSlider, toSlider, '#909090', '#F71313', toSlider)
	setToggleAccessible(toSlider)
	if (from <= to) {
		toSlider.value = to
		toInput.value = to
	} else {
		toInput.value = from
		toSlider.value = from
	}
}

function getParsed(currentFrom, currentTo) {
	const from = parseInt(currentFrom.value, 10)
	const to = parseInt(currentTo.value, 10)
	return [from, to]
}

function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
	const rangeDistance = to.max - to.min
	const fromPosition = from.value - to.min
	const toPosition = to.value - to.min
	controlSlider.style.background = `linear-gradient(to right, ${sliderColor} 0%, ${sliderColor} ${
		(fromPosition / rangeDistance) * 100
	}%, ${rangeColor} ${(fromPosition / rangeDistance) * 100}%, ${rangeColor} ${
		(toPosition / rangeDistance) * 100
	}%, ${sliderColor} ${
		(toPosition / rangeDistance) * 100
	}%, ${sliderColor} 100%)`
}

function setToggleAccessible(currentTarget) {
	const toSlider = document.querySelector('#toSlider')
	if (Number(currentTarget.value) <= 0) {
		toSlider.style.zIndex = 2
	} else {
		toSlider.style.zIndex = 0
	}
}

fromSlider.addEventListener('input', () =>
	controlFromSlider(fromSlider, toSlider, fromInput)
)
toSlider.addEventListener('input', () =>
	controlToSlider(fromSlider, toSlider, toInput)
)
fromInput.addEventListener('input', () =>
	controlFromInput(fromSlider, fromInput, toInput, toSlider)
)
toInput.addEventListener('input', () =>
	controlToInput(toSlider, fromInput, toInput, toSlider)
)

