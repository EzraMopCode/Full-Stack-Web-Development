export default async function loading() {
     const result = await  setTimeout(() => {
          <p>loading.....</p>
     }, 2000);

     return (
          <h1>The page {result}</h1>
     )
}
