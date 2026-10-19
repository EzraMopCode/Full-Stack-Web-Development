import { cookies } from 'next/headers';

export default async function CheckoutPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token');

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">Checkout</h1>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <span className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
          Order Details
        </h2>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl mb-8">
          <p className="text-slate-600">
            <span className="font-bold text-slate-800">Routing Status:</span> Dynamic Route Active (Cookies verified)
          </p>
        </div>

        <button className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-600/30 transition-all text-lg">
          Place Order
        </button>
      </div>
    </div>
  );
}
