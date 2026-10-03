export default async function Page({params}) {
     const {id} = await params();

     return(
          <main>
               <h1>Our Daynamic Route Page.</h1>
               <p>The params take from the Url <strong>{id}</strong></p>
          </main>
     )
}
