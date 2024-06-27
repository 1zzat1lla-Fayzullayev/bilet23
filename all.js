document.addEventListener('DOMContentLoaded', function () {
	const hamburgerMenuToggle = document.querySelector('#hamburgerMenuToggle')
	const hamburgerMenu = document.querySelector('#hamburgerMenu')

	hamburgerMenuToggle.addEventListener('click', function () {
		hamburgerMenu.classList.toggle('open')
		hamburgerMenuToggle.classList.toggle('close')
	})
})

document.addEventListener('DOMContentLoaded', function () {
	const searchToggle = document.getElementById('searchToggle')
	const searchMenu = document.getElementById('searchMenu')
	const closeSearch = document.getElementById('closeSearch')

	searchToggle.addEventListener('click', function () {
		searchMenu.classList.toggle('hidden')
	})

	closeSearch.addEventListener('click', function () {
		searchMenu.classList.add('hidden')
	})
})

document.addEventListener('DOMContentLoaded', () => {
	const dropdownHeaders = document.querySelectorAll("[id^='dropdown']")
	dropdownHeaders.forEach(header => {
		header.addEventListener('click', () => {
			const contentId = header.id.replace('dropdown', 'dropdownContent')
			const content = document.getElementById(contentId)
			const isHidden = content.classList.contains('hidden')

			document.querySelectorAll("[id^='dropdownContent']").forEach(item => {
				item.classList.add('hidden')
				item.previousElementSibling.querySelector('img').src =
					'./images/plus.png'
				item.previousElementSibling
					.querySelector('h3')
					.classList.remove('text-[#F71313]')
				item.previousElementSibling
					.querySelector('h3')
					.classList.add('text-black')
			})

			if (isHidden) {
				content.classList.remove('hidden')
				header.querySelector('img').src = './images/minus.png'
				header.querySelector('h3').classList.add('text-[#F71313]')
				header.querySelector('h3').classList.remove('text-black')
			}
		})
	})
})

document.addEventListener('DOMContentLoaded', function () {
	const modal = document.getElementById('imageModal')
	const modalImg = document.getElementById('modalImage')
	const span = document.getElementsByClassName('closeK')[0]

	const images = document.querySelectorAll('.gallery-img')
	images.forEach(img => {
		img.addEventListener('click', function () {
			modal.style.display = 'block'
			modalImg.src = this.src
		})
	})

	span.onclick = function () {
		modal.style.display = 'none'
	}

	window.onclick = function (event) {
		if (event.target === modal) {
			modal.style.display = 'none'
		}
	}
})
