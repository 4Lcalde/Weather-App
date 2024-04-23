import { imgs } from './src/data/weatherImages'
import './style.css'

const weather$$ = document.querySelector('#weather')

//                             lat       long   zoom
let map = L.map('map').setView([40.39094, -3.7242], 12)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 25,
  attribution: '&copy; <a href="#">Mapa del tiempo</a>'
}).addTo(map)

//! EN ESTE TIPO DE FUNCIONES DONDE HAGO PETICIONES TENGO QUE METER EL ASYNC Y AWAIT PAR QUE EL CÓDIGO NO SE EJECUTE HASTA QUE NO SE HAYA REALIZADO LA PETICIÓN Y EL TIEMPO QUE TARDA.
const realizarPeticion = async (e) => {
  weather$$.innerHTML = ''
  const { lat, lng } = e.latlng

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${
      import.meta.env.VITE_API_KEY
    }`
  )
  const datos = document.createElement('div')
  const weather = await response.json()
  const img = document.createElement('img')
  const name = document.createElement('h2')
  const temperatura = document.createElement('h3')
  const humedad = document.createElement('p')
  const salidaSol = document.createElement('p')
  const ocultaSol = document.createElement('p')
  const viento = document.createElement('p')

  const salida = new Date(weather.sys.sunrise * 1000)
  const puesta = new Date(weather.sys.sunset * 1000)

  name.textContent = weather.name
  temperatura.textContent = Math.round(weather.main.temp - 273.15) + 'ºC'
  humedad.textContent = 'Humedad: ' + weather.main.humidity + '%'
  salidaSol.textContent =
    'Amanecer: ' + salida.getHours() + ':' + salida.getMinutes()
  ocultaSol.textContent =
    'Atardecer: ' + puesta.getHours() + ':' + puesta.getMinutes()
  viento.textContent =
    img.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`

  weather$$.append(datos)
  datos.append(name, temperatura, humedad, salidaSol, ocultaSol, img)
  weather$$.style = ` background-image: url(${
    imgs.find((img) => img.name === weather.weather[0].main).img
  });`

  console.log(weather)
}

map.on('click', realizarPeticion)
