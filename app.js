const url = 'https://course-api.com/react-useReducer-cart-project'

const total = document.querySelector('.total')
const shopSection = document.querySelector('.shop')
const clearBtn = document.querySelector('.clear-btn')
const totalPrice = document.getElementById('total-price')
const cursor = document.querySelector('.cursor')

document.addEventListener('mousemove', cursorMovement)

function cursorMovement(e) {
  cursor.style.top = e.pageY + 'px'
  cursor.style.left = e.pageX + 'px'
}

document.addEventListener('DOMContentLoaded', fetchData)
async function fetchData() {
  const res = await fetch(url)
  const data = await res.json()

  data.map((item) => {
    const shopCol = document.createElement('div')
    shopCol.className = 'shop-col'
    const { id, img, title, price, amount } = item

    shopCol.innerHTML = `<div class="shop-col-img" id=${id}>
                                <img src=${img} alt="phone" />
                               </div>
                               <div class="shop-col-info">
                                 <h3>${title}</h3>
                                 <p>${price}</p>
                                 <button id='remove'>remove</button>
                                </div>
                                <div class="shop-col-btns">
                                    <button id='increase'><i class="fas fa-chevron-circle-up"></i></button>
                                    <div class="amount">${amount}</div>
                                    <button id='decrease'><i class="fas fa-chevron-circle-down"></i></button>
                                </div>`

    shopSection.appendChild(shopCol)
  })

  total.innerText = data.reduce((acc, value) => {
    return acc + value.amount
  }, 0)

  totalPrice.innerText = data.reduce((acc, value) => {
    let num = parseFloat(value.price)
    return acc + num
  }, 0)
}

shopSection.addEventListener('click', (e) => {
  if (e.target.id === 'increase') {
    let amountNum = parseInt(e.target.nextElementSibling.innerText) + 1
    e.target.nextElementSibling.innerText = amountNum
    let totalUpdate = +total.innerText
    totalUpdate = totalUpdate + 1
    total.innerText = totalUpdate

    let price = +e.target.parentElement.previousElementSibling.childNodes[3]
      .innerText
    let totalPriceInt = parseFloat(totalPrice.innerText)
    totalPriceInt += price
    totalPriceInt = totalPriceInt.toFixed(2)
    totalPrice.innerText = totalPriceInt
  }

  if (e.target.id === 'decrease') {
    let amountNum = parseInt(e.target.previousElementSibling.innerText) - 1
    if (amountNum < 0) {
      e.target.parentElement.parentElement.remove()
      return
    }
    e.target.previousElementSibling.innerText = amountNum
    let totalUpdate = +total.innerText
    totalUpdate = totalUpdate - 1
    total.innerText = totalUpdate

    let price = +e.target.parentElement.previousElementSibling.childNodes[3]
      .innerText
    let totalPriceInt = parseFloat(totalPrice.innerText)
    totalPriceInt -= price
    totalPriceInt = totalPriceInt.toFixed(2)
    totalPrice.innerText = totalPriceInt
  }

  if (e.target.id === 'remove') {
    e.target.parentElement.parentElement.classList.add('shrink')

    e.target.parentElement.parentElement.addEventListener(
      'transitionend',
      () => {
        e.target.parentElement.parentElement.remove()
      }
    )
    let totalUpdate = +total.innerText
    totalUpdate = totalUpdate - 1
    total.innerText = totalUpdate
  }

  let price = +e.target.parentElement.parentElement.parentElement
    .nextElementSibling.childNodes[3].innerText
  let itemPrice = +e.target.previousElementSibling.innerText
  totalPrice.innerText = price - itemPrice
})

clearBtn.addEventListener('click', () => {
  shopSection
    .querySelectorAll('.shop-col')
    .forEach((e) => e.parentNode.removeChild(e))

  total.innerText = 0
  totalPrice.innerText = 0
})
