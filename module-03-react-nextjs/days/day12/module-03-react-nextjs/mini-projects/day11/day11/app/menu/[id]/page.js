import { notFound } from "next/navigation";

const foods = [
     {id: 1, name: 'kitfo', price: 123},
     {id: 2, name: 'tibs', price: 56},
     {id: 3, name: 'kurte', price: 178},
     {id: 4, name: 'kikil', price: 200},
]
export default async function Page({params}) {

     const resolved = await params;
     const id = resolved.id;

     const filterdItem = foods.find(item => item.id === Number(id));

     if (!filterdItem) {
          notFound();
     }

     return(
          <main>
               <h1>Our Daynamic Route Page.</h1>
               <p>The food Id: {filterdItem.id}</p>
               <p>The food name: {filterdItem.name}</p>
               <p>The food price: {filterdItem.price}</p>
          </main>
     )
}
