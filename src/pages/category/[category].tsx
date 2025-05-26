'use client'

import { useRouter } from 'next/router'
import CategoryPage from '../../components/CategoryPage'

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: "Taylor Swift - The Eras Tour",
    date: "2024-03-15",
    venue: "SoFi Stadium",
    image: "/images/events/taylor-swift.jpg",
    price: "$299",
    description: "Experience the magic of Taylor Swift's Eras Tour",
    category: "concerts"
  },
  {
    id: 2,
    title: "Los Angeles Lakers vs. Golden State Warriors",
    date: "2024-03-20",
    venue: "Crypto.com Arena",
    image: "/images/events/lakers-warriors.jpg",
    price: "$199",
    description: "NBA Regular Season Game",
    category: "sports"
  },
  {
    id: 3,
    title: "Hamilton",
    date: "2024-04-01",
    venue: "Pantages Theatre",
    image: "/images/events/hamilton.jpg",
    price: "$149",
    description: "The award-winning musical",
    category: "theater"
  },
  {
    id: 4,
    title: "Drake - It's All A Blur Tour",
    date: "2024-04-15",
    venue: "Kia Forum",
    image: "/images/events/drake.jpg",
    price: "$249",
    description: "Drake's highly anticipated tour",
    category: "concerts"
  },
  {
    id: 5,
    title: "Los Angeles Dodgers vs. San Francisco Giants",
    date: "2024-04-20",
    venue: "Dodger Stadium",
    image: "/images/events/dodgers-giants.jpg",
    price: "$89",
    description: "MLB Regular Season Game",
    category: "sports"
  },
  {
    id: 6,
    title: "The Lion King",
    date: "2024-05-01",
    venue: "Hollywood Pantages Theatre",
    image: "/images/events/lion-king.jpg",
    price: "$129",
    description: "The classic Disney musical",
    category: "theater"
  },
  {
    id: 7,
    title: "Bad Bunny - World's Hottest Tour",
    date: "2024-05-15",
    venue: "SoFi Stadium",
    image: "/images/events/bad-bunny.jpg",
    price: "$199",
    description: "Bad Bunny's world tour",
    category: "concerts"
  },
  {
    id: 8,
    title: "Los Angeles Rams vs. San Francisco 49ers",
    date: "2024-05-20",
    venue: "SoFi Stadium",
    image: "/images/events/rams-49ers.jpg",
    price: "$299",
    description: "NFL Regular Season Game",
    category: "sports"
  },
  {
    id: 9,
    title: "Wicked",
    date: "2024-06-01",
    venue: "Pantages Theatre",
    image: "/images/events/wicked.jpg",
    price: "$159",
    description: "The popular Broadway musical",
    category: "theater"
  },
  {
    id: 10,
    title: "Beyoncé - Renaissance World Tour",
    date: "2024-06-15",
    venue: "SoFi Stadium",
    image: "/images/events/beyonce.jpg",
    price: "$349",
    description: "Beyoncé's Renaissance World Tour",
    category: "concerts"
  },
  {
    id: 11,
    title: "Los Angeles Kings vs. Anaheim Ducks",
    date: "2024-06-20",
    venue: "Crypto.com Arena",
    image: "/images/events/kings-ducks.jpg",
    price: "$129",
    description: "NHL Regular Season Game",
    category: "sports"
  },
  {
    id: 12,
    title: "The Book of Mormon",
    date: "2024-07-01",
    venue: "Pantages Theatre",
    image: "/images/events/book-of-mormon.jpg",
    price: "$139",
    description: "The Tony Award-winning musical",
    category: "theater"
  }
]

const CategoryPageWrapper = () => {
  const router = useRouter()
  const { category } = router.query

  // Filter events by category
  const categoryEvents = mockEvents.filter(
    event => event.category === category?.toString().toLowerCase()
  )

  if (!category) {
    return null
  }

  return (
    <CategoryPage
      category={category.toString()}
      events={categoryEvents}
    />
  )
}

export default CategoryPageWrapper 