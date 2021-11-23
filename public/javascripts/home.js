// highlight item list
const itemRows = document.querySelectorAll('.item-row')

for (let i = 0; i < itemRows.length; i++) {
  if (i % 2 === 0) {
    itemRows[i].classList.add('bg-light')
  }
}

// addEventListener to all delete button
const allDeleteBtn = document.querySelectorAll('.delete-btn')
allDeleteBtn.forEach(btn => btn.addEventListener('click', (event) => {
  const id = event.target.dataset.id
  const name = event.target.dataset.name
  const amount = event.target.dataset.amount

  // render modal HTML
  const modalHTML = `開支名稱：${name}<br>開支金額：${amount}`
  const modalBody = document.querySelector('.modal-body')
  const deleteForm = document.querySelector('.delete-form')
  modalBody.innerHTML = modalHTML
  deleteForm.action = `/expenses/${id}?_method=DELETE`
}))

// addEventListener to all delete button
const filterForm = document.querySelector('.filter-form')
filterForm.addEventListener('change', (event) => {
  window.location.href = `/filter/${event.target.value}`
})