import { notFound } from "next/navigation";

export default async function Dishpage({params}) {
     const dish = await getDish(params.id)

     if(!dish) {
          return notFound();
     }
     return(
          <h1>The page notFound</h1>
     )
}
