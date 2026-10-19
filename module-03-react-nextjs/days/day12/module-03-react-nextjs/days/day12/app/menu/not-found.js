import Link from 'next/link'

export default async function DishNotFound() {
     return(
          <div>
               <h2>🥘 Dish Not Found</h2>
               <p>Sorry! That item is not currently prepared on the Addis Eats traditional menu line.</p>
               <Link href='/menu'>Back to Menu</Link>
          </div>

     )
}
