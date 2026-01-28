import alfalfaImg from '../assets/pictures/fake-crops/alfalfa.webp'
import cartamoImg from '../assets/pictures/fake-crops/cartamo.jpg'
import celeryImg from '../assets/pictures/fake-crops/celery.jpg'
import girasolImg from '../assets/pictures/fake-crops/girasol.jpg'
import radicchioImg from '../assets/pictures/fake-crops/radicchio.webp'
import trigoImg from '../assets/pictures/fake-crops/trigo.webp'
import yellowSquashImg from '../assets/pictures/fake-crops/yellow-squash.jpg'
import zucchiniImg from '../assets/pictures/fake-crops/zucchini.webp'

export const crops = [
  {
    id: 1,
    name: 'Alfalfa',
    image: alfalfaImg,
    description:
      'Forraje fundamental para la ganadería regional, cultivado de manera orgánica y destinado principalmente a la venta local para ganaderos de la zona, fortaleciendo la economía regional.',
    features: [
      '🐄 Ideal para alimentación de ganado por su alto valor nutritivo.',
      '🌾 Cultivo perenne que mejora la salud del suelo.',
      '🤝 Producción local orientada al mercado ganadero regional.',
    ],
  },
  {
    id: 2,
    name: 'Apio',
    image: celeryImg,
    description:
      'Cultivo fresco y aromático, sembrado bajo un manejo orgánico que prioriza la salud del suelo y la calidad del producto final. Está destinado a exportación al mercado de Estados Unidos, cumpliendo con altos estándares de producción e inocuidad.',
    features: [
      '🥬 Tallos crujientes y de sabor natural.',
      '🌱 Producción responsable y regenerativa.',
      '📦 Calidad para exportación',
    ],
  },
  {
    id: 3,
    name: 'Radicchio',
    image: radicchioImg,
    description:
      'Hortaliza de hoja con carácter y sabor distintivo. En ALCEMA lo cultivamos con técnicas regenerativas que respetan el suelo y el entorno.',
    features: [
      '🍃 Sabor intenso y coloración natural.',
      '🍽️ Alto valor gastronómico.',
      '🌍 Producción orgánica con prácticas sustentables.',
    ],
  },
  {
    id: 4,
    name: 'Calabaza Zucchinii',
    image: zucchiniImg,
    description:
      'Hortaliza fresca producida de manera orgánica, cuidando cada etapa del cultivo para ofrecer un producto sano, de excelente sabor y calidad.',
    features: [
      '🥒 Producción continua durante la temporada.',
      '🥗 Alto valor nutricional y frescura.',
      '🚫 Cultivada sin agroquímicos sintéticos.',
    ],
  },
  {
    id: 5,
    name: 'Calabaza Amarilla (Yellow Squash)',
    image: yellowSquashImg,
    description:
      'Hortaliza de temporada, reconocida por su sabor suave y textura tierna. En ALCEMA la cultivamos de forma orgánica, bajo prácticas sustentables que cuidan el suelo y el entorno.',
    features: [
      '⭐ Fruto tierno y de alta calidad comercial.',
      '🌞 Crecimiento rápido y eficiente en campo.',
      '🌱 Producción orgánica con manejo regenerativo.',
    ],
  },
  {
    id: 6,
    name: 'Trigo',
    image: trigoImg,
    description:
      'El trigo es uno de nuestros cultivos tradicionales, sembrado bajo prácticas regenerativas que conservan la fertilidad del suelo y garantizan un grano limpio y natural.',
    features: [
      '🌾 Grano orgánico de alta calidad.',
      '🪴 Mejora la estructura del suelo dentro de la rotación agrícola.',
      '♻️ Producción responsable con bajo impacto ambiental.',
    ],
  },
  {
    id: 7,
    name: 'Girasol',
    image: girasolImg,
    description:
      'Cultivo versátil y de gran valor, reconocido por su aceite y por su aporte ecológico. Nuestro girasol se cultiva de forma sustentable, respetando los ciclos naturales del campo.',
    features: [
      '🌻 Semilla rica en aceite vegetal.',
      '🐝 Atrae polinizadores y promueve la biodiversidad.',
      '☀️ Adaptable a diferentes condiciones de suelo y clima.',
    ],
  },
  {
    id: 8,
    name: 'Cártamo',
    image: cartamoImg,
    description:
      'Cultivo oleaginoso adaptado a climas secos y suelos del sur de Sonora. En ALCEMA lo producimos de forma orgánica, priorizando la salud del suelo y su aprovechamiento integral para alimentos y usos industriales.',
    features: [
      '🏵️ Alto contenido de aceite vegetal de calidad.',
      '💧 Resistente a la sequía y eficiente en el uso del agua.',
      '🌱 Favorece la rotación de cultivos y la regeneración del suelo.',
    ],
  },
]
