const author = document.getElementById('author')
const nameCryptoEl = document.getElementById('name-crypto')
const pricesCrypto = document.getElementById('prices-crypto')
const timeEl = document.getElementById('time')
const weatherEl = document.getElementById('weather')
const cityNameEl = document.getElementById('city-name')

fetch(
  'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=car',
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    document.body.style.backgroundImage = `url(${data.urls.full}),linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30))`
    author.textContent = `By: ${data.user.name}`
  })
  .catch((err) => {
    console.log('Something went wrong.')
    document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 1))`
  })

fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
  .then((res) => res.json())
  .then((data) => {
    console.log(data.market_data.current_price.usd)
    console.log(data.name)
    console.log(data.image.thumb)
    nameCryptoEl.innerHTML = `<img src="${data.image.thumb}" alt="bitcoin logo"> <span id="nameCrypto">${data.name}</span>`
    pricesCrypto.innerHTML = `<p>🎯$ ${data.market_data.current_price.usd}</p>
    <p>👆$ ${data.market_data.high_24h.usd}</p>
    <p>👇$ ${data.market_data.low_24h.usd}</p>`
  })
  .catch((err) => {
    console.log('something went wrong')
  })

function setTime() {
  const date = new Date() //"new" ile current time a odaklanıyor date.
  timeEl.textContent = date.toLocaleString('tr-tr', { timeStyle: 'medium' })
}
setInterval(setTime, 1000) //sürekli bir şekilde fonskiyonu çağırır setInterval

function setWeather() {
  navigator.geolocation.getCurrentPosition((position) => {
    fetch(
      `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`,
    )
      .then((res) => {
        if (!res.ok) {
          throw Error('Something went wrong.')
        }

        return res.json()
      })
      .then((data) => {
        weatherEl.innerHTML = `
        <p>${data.main.temp} °C</p>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png">
        `
        cityNameEl.textContent = data.name
        console.log(data)
      })
      .catch((err) => {
        console.error(err)
      })
  })
}
setWeather()
setInterval(setWeather, 3600000)
