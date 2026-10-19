export async function generateStaticParams() {
  return [
    { id: 'shiro' },
    { id: 'tibs' }
  ];
}

export default async function DishPage({ params }) {
  const { id } = await params;

  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm">
      <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      </div>

      <h1 className="text-4xl font-bold text-slate-800 capitalize mb-4">
        {id.replace('-', ' ')}
      </h1>

      <p className="text-lg text-slate-500 mb-8 leading-relaxed max-w-2xl">
        A delicious, freshly prepared serving of {id.replace('-', ' ')}. Made with authentic local spices and served immediately for the best taste.
      </p>

      <div className="flex items-center gap-6">
        <span className="text-3xl font-bold text-orange-600">250 ETB</span>
        <button className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-600/30 transition-all">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
