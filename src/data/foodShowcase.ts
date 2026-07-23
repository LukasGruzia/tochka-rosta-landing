import brownieImage from '../assets/food/brownie.png'
import caesarImage from '../assets/food/caesar.png'
import bowlImage from '../assets/food/chicken-rice-bowl.png'
import khinkaliImage from '../assets/food/khinkali.png'
import proteinShakeImage from '../assets/food/protein-shake.png'
import syrnikiImage from '../assets/food/syrniki.png'

export type FoodShowcaseItem = {
  id: string
  name: string
  image: string
  calories: number
  protein: number
  price: number
  badge: string
}

export const foodShowcase: FoodShowcaseItem[] = [
  {
    id: 'caesar',
    name: 'Цезарь ПП',
    image: caesarImage,
    calories: 320,
    protein: 30,
    price: 300,
    badge: 'Много белка',
  },
  {
    id: 'bowl',
    name: 'Боул с курицей и рисом',
    image: bowlImage,
    calories: 520,
    protein: 42,
    price: 390,
    badge: 'Сытный обед',
  },
  {
    id: 'syrniki',
    name: 'Сырники без сахара',
    image: syrnikiImage,
    calories: 310,
    protein: 24,
    price: 260,
    badge: 'Без сахара',
  },
  {
    id: 'khinkali',
    name: 'Хинкали ПП',
    image: khinkaliImage,
    calories: 460,
    protein: 35,
    price: 370,
    badge: 'Грузинский вкус',
  },
  {
    id: 'protein-shake',
    name: 'Протеиновый коктейль',
    image: proteinShakeImage,
    calories: 250,
    protein: 32,
    price: 290,
    badge: 'После тренировки',
  },
  {
    id: 'brownie',
    name: 'Брауни без сахара',
    image: brownieImage,
    calories: 270,
    protein: 16,
    price: 230,
    badge: 'Без сахара',
  },
]
