document.addEventListener('DOMContentLoaded', () => {
    createRamenMenu(ramenUrl)
})

const ramenUrl = "http://localhost:3000/ramens"
function createRamenMenu(url){
    fetch(url)
    .then(res => res.json())
    .then(data => addRamen(data))
}


function addRamen(data) {
    const menu = document.querySelector("#ramen-menu")
    data.forEach(ramen => {
        const imgUrl = document.createElement('img')
        imgUrl.src = ramen.image
        imgUrl.className = 'menuItems'
        imgUrl.onclick = () => {
            document.querySelector(".detail-image").src = ramen.image
            document.querySelector(".name").textContent = ramen.name
            document.querySelector(".restaurant").textContent = ramen.restaurant
            document.querySelector("#rating-display").textContent = ramen.rating
            document.querySelector("#comment-display").textContent = ramen.comment
        }
        menu.appendChild(imgUrl)
    })
}
document.querySelector("#new-ramen").addEventListener('submit', handleSubmit)

function handleSubmit(e){
    e.preventDefault();
    let newRamenItem = {
        name: e.target.name.value,
        restaurant: e.target.restaurant.value,
        image: e.target.image.value,
        rating: e.target.rating.value,
        comment: e.target.number.value
    }
    createNewRamen(newRamenItem)
}


function createNewRamen(ramenObj) {
    fetch(ramenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ramenObj)
    })
}
