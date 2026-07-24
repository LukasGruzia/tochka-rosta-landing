import brownieImage from '../assets/food/brownie.png'
import caesarImage from '../assets/food/caesar.png'
import bowlImage from '../assets/food/chicken-rice-bowl.png'
import khinkaliImage from '../assets/food/khinkali.png'
import proteinShakeImage from '../assets/food/protein-shake.png'
import syrnikiImage from '../assets/food/syrniki.png'
import brownieMobileImage from '../assets/mobile/food/brownie.jpg'
import caesarMobileImage from '../assets/mobile/food/caesar.jpg'
import bowlMobileImage from '../assets/mobile/food/chicken-rice-bowl.jpg'
import khinkaliMobileImage from '../assets/mobile/food/khinkali.jpg'
import proteinShakeMobileImage from '../assets/mobile/food/protein-shake.jpg'
import syrnikiMobileImage from '../assets/mobile/food/syrniki.jpg'

export type ProductId = 'caesar' | 'bowl' | 'syrniki' | 'khinkali' | 'protein-shake' | 'brownie'

export type Product = {
  id: ProductId
  name: string
  image: string
  mobileImage: string
  calories: number
  protein: number
  fat: number
  carbs: number
  price: number
  badge: string
}

export const products: Product[] = [
  {
    id: 'caesar',
    name: 'Цезарь ПП',
    image: caesarImage,
    mobileImage: caesarMobileImage,
    calories: 320,
    protein: 30,
    fat: 12,
    carbs: 18,
    price: 300,
    badge: 'Много белка',
  },
  {
    id: 'bowl',
    name: 'Боул с курицей и рисом',
    image: bowlImage,
    mobileImage: bowlMobileImage,
    calories: 520,
    protein: 42,
    fat: 17,
    carbs: 54,
    price: 390,
    badge: 'Сытный обед',
  },
  {
    id: 'syrniki',
    name: 'Сырники без сахара',
    image: syrnikiImage,
    mobileImage: syrnikiMobileImage,
    calories: 310,
    protein: 24,
    fat: 12,
    carbs: 31,
    price: 260,
    badge: 'Без сахара',
  },
  {
    id: 'khinkali',
    name: 'Хинкали ПП',
    image: khinkaliImage,
    mobileImage: khinkaliMobileImage,
    calories: 460,
    protein: 35,
    fat: 16,
    carbs: 48,
    price: 370,
    badge: 'Грузинский вкус',
  },
  {
    id: 'protein-shake',
    name: 'Протеиновый коктейль',
    image: proteinShakeImage,
    mobileImage: proteinShakeMobileImage,
    calories: 250,
    protein: 32,
    fat: 6,
    carbs: 18,
    price: 290,
    badge: 'После тренировки',
  },
  {
    id: 'brownie',
    name: 'Брауни без сахара',
    image: brownieImage,
    mobileImage: brownieMobileImage,
    calories: 270,
    protein: 16,
    fat: 10,
    carbs: 32,
    price: 230,
    badge: 'Без сахара',
  },
]

export const productsById = Object.fromEntries(products.map((product) => [product.id, product])) as Record<ProductId, Product>
