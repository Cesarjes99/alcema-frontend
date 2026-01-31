import alfalfaImg from '../assets/pictures/fake-crops/alfalfa.webp'
import cartamoImg from '../assets/pictures/fake-crops/cartamo.jpg'
import celeryImg from '../assets/pictures/fake-crops/celery.jpg'
import girasolImg from '../assets/pictures/fake-crops/girasol.jpg'
import radicchioImg from '../assets/pictures/fake-crops/radicchio.JPG'
import trigoImg from '../assets/pictures/fake-crops/trigo.webp'
import yellowSquashImg from '../assets/pictures/fake-crops/yellow-squash.jpg'
import zucchiniImg from '../assets/pictures/fake-crops/zucchini.webp'

/**
 * Crop data - names, descriptions and features are translated via i18n.
 * Each crop has a translationKey that maps to cropDetails.{key} in the translations.
 */
export const crops = [
  { id: 1, translationKey: 'alfalfa', image: alfalfaImg },
  { id: 2, translationKey: 'celery', image: celeryImg },
  { id: 3, translationKey: 'radicchio', image: radicchioImg },
  { id: 4, translationKey: 'zucchini', image: zucchiniImg },
  { id: 5, translationKey: 'yellowSquash', image: yellowSquashImg },
  { id: 6, translationKey: 'wheat', image: trigoImg },
  { id: 7, translationKey: 'sunflower', image: girasolImg },
  { id: 8, translationKey: 'safflower', image: cartamoImg },
]
