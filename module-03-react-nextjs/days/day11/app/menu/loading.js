export default async function loading() {
     const result = await  setTimeout(() => {

     }, 80000);

     return (
          <div style={{ padding: '2rem', background: '#e0f2fe', color: '#0369a1', borderRadius: '8px' }}>
               ⏳ Loading Addis Eats delicious updates... Please wait.
          </div>
     )
}
