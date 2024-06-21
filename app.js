document.addEventListener('DOMContentLoaded', function () {
	const hamburgerMenuToggle = document.getElementById('hamburgerMenuToggle')
	const hamburgerMenu = document.getElementById('hamburgerMenu')
	const datePickerToggle = document.getElementById('datePickerToggle')
	const closeCalendarModal = document.getElementById('closeCalendarModal')
	const priceButton = document.getElementById('priceButton')
	const closePriceRangeModal = document.getElementById('closePriceRangeModal')
	const calendar = document.getElementById('calendar')
	const price = document.getElementById('price')
	const priceImg = priceButton.querySelector('img')
	const dataImg = datePickerToggle.querySelector('img')

	datePickerToggle.addEventListener('click', function () {
		calendar.classList.toggle('hidden')
		const isDataActive = datePickerToggle.classList.toggle('active')
		const dataSrc = isDataActive
			? './images/active-data.png'
			: './images/date.svg'
		dataImg.src = dataSrc
	})

	closeCalendarModal.addEventListener('click', function () {
		calendar.classList.add('hidden')
		datePickerToggle.classList.remove('active')
		datePickerToggle.classList.remove('active')
		dataImg.src = './images/date.svg'
	})

	priceButton.addEventListener('click', function () {
		price.classList.toggle('hidden')
		const isActive = priceButton.classList.toggle('active')
		const imgSrc = isActive ? './images/active-price.png' : './images/price.svg'
		priceImg.src = imgSrc
	})

	closePriceRangeModal.addEventListener('click', function () {
		price.classList.add('hidden')
		priceButton.classList.remove('active')
		priceImg.classList.remove('active')
		priceImg.src = './images/price.svg'
	})

	window.onclick = function (event) {
		if (event.target === price) {
			price.classList.add('hidden')
			priceButton.classList.remove('active')
		}
	}

	hamburgerMenuToggle.addEventListener('click', function () {
		hamburgerMenu.classList.toggle('open')
		hamburgerMenuToggle.classList.toggle('close')
	})

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
})

document.addEventListener('DOMContentLoaded', function () {
	const nextMonth = document.getElementById('nextMonth')
	const prevMonth = document.getElementById('prevMonth')
	const nextYear = document.getElementById('nextYear')
	const prevYear = document.getElementById('prevYear')
	const monthYear = document.getElementById('monthYear')
	const calendarDays = document.getElementById('calendarDays')
	const closeModal = document.getElementById('closeCalendarModal')
	const datePickerToggle = document.getElementById('datePickerToggle')

	let currentDate = new Date()
	let today = new Date()

	function renderCalendar() {
		const year = currentDate.getFullYear()
		const month = currentDate.getMonth()
		const firstDay = (new Date(year, month, 1).getDay() + 6) % 7 // Adjust for Monday as first day
		const lastDate = new Date(year, month + 1, 0).getDate()

		monthYear.textContent = `${currentDate.toLocaleString('default', {
			month: 'long',
		})} ${year}`

		calendarDays.innerHTML = ''

		let days = []
		for (let i = 0; i < firstDay; i++) {
			days.push('<li></li>')
		}
		for (let i = 1; i <= lastDate; i++) {
			if (
				year === today.getFullYear() &&
				month === today.getMonth() &&
				i === today.getDate()
			) {
				days.push(`<li class="today">${i}</li>`)
			} else {
				days.push(`<li>${i}</li>`)
			}
		}

		// Ensure the calendar grid has 6 weeks for consistency
		while (days.length % 7 !== 0) {
			days.push('<li></li>')
		}
		if (days.length < 42) {
			while (days.length < 42) {
				days.push('<li></li>')
			}
		}

		let weeks = []
		for (let i = 0; i < days.length; i += 7) {
			weeks.push(
				`<ul class="flex items-center justify-between px-[15px] w-full">${days
					.slice(i, i + 7)
					.join('')}</ul>`
			)
		}

		calendarDays.innerHTML = weeks.join('')
	}

	nextMonth.addEventListener('click', () => {
		currentDate.setMonth(currentDate.getMonth() + 1)
		renderCalendar()
	})

	prevMonth.addEventListener('click', () => {
		currentDate.setMonth(currentDate.getMonth() - 1)
		renderCalendar()
	})

	nextYear.addEventListener('click', () => {
		currentDate.setFullYear(currentDate.getFullYear() + 1)
		renderCalendar()
	})

	prevYear.addEventListener('click', () => {
		currentDate.setFullYear(currentDate.getFullYear() - 1)
		renderCalendar()
	})

	renderCalendar()
})
