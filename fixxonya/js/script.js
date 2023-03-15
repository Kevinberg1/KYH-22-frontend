const arrow = document.querySelector('#top-arrow')
arrow.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: "smooth" })
})

function starrating(starRating) {
    let starRatingString = '';
    for (let i = 0; i < 5; i++) {

        if (i < starRating) {

            starRatingString += '<i class="fa-solid fa-sharp fa-star"></i>';

        } else {

            starRatingString += '<i class="fa-regular fa-sharp fa-star"></i>';
        }

    }
    return starRatingString;
}

window.addEventListener('scroll', function () {
    const scrollPosY = window.scrollY

    if (scrollPosY >= 100) {
        arrow.style.display = 'block'
    } else {
        arrow.style.display = 'none'
    }
})

try {
    const toggleButton = document.querySelector('[data-option="toggle"]')
    const target = toggleButton.getAttribute('data-target')
    toggleButton.addEventListener('click', toggleTarget)

    function toggleTarget() {
        const element = document.querySelector(target)

        if (!element.classList.contains('hide')) {
            element.classList.add('hide')
        } else {
            element.classList.remove('hide')
        }
    }
} catch { }


async function getProducts(target, tag) {
    const element = document.querySelector(target)

    const res = await fetch(`https://kyh-net22.azurewebsites.net/api/products/${tag}`)
    const data = await res.json()

    for (let item of data) {
        element.innerHTML +=
            `
        <div class="collection-card">
            <div class="card-content">
                <img src="${item.imageUrl}" alt="${item.name}">
                <div class="card-menu">
                    <nav class="icons">
                        <a class="link" href="#"><i class="fa-regular fa-heart"></i></a>
                        <a class="link" href="#"><i class="fa-regular fa-code-compare"></i></a>
                        <a class="link" href="#"><i class="fa-regular fa-bag-shopping"></i></a>
                    </nav>
                    <a class="btn-theme" href="#">QUICK VIEW</a>
                </div>
            </div>
            <div class="card-body">
                <p class="category">${item.category}</p>
                <p class="title">${item.name}</p>
                    <div class="ranking">
                        ${starrating(item.starRating)}
                    </div>
                <p class="price">${item.originalPrice} ${item.currency}</p>
            </div>
        </div>
       
        `
    }
}


console.log(starRatingString);

async function handleContactForm(e) {
    e.preventDefault()

    const form = {
        name: "Kevin Berg",
        email: "kevinberg@bla.se",
        comments: "Jag vill att du kontaktar mig så snart som möjligt. Jag behöver återkalla en order."
    }

    const res = await fetch('https://kyh-net22.azurewebsites.net/api/contacts', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    })

    if (res.status === 200)
        console.log('tack för din förfrågan!')

}