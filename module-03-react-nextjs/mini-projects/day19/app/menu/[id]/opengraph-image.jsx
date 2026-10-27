import { ImageResponse } from 'next/og';
import { menuData } from '@/data/menuData';

export const alt = 'Ethiopian Dish Preview | Addis Eats';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }) {
  const { id } = await params;
  const dish = menuData.find((d) => d.id === parseInt(id)) || {
    name: 'Authentic Ethiopian Meal',
    category: 'Traditional',
    price: 250,
    description: 'Freshly prepared Ethiopian culinary special.'
  };

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0f172a',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff' }}>
            Addis<span style={{ color: '#ea580c' }}>Eats</span>
          </span>
          <span
            style={{
              backgroundColor: '#ea580c',
              color: '#ffffff',
              padding: '8px 24px',
              borderRadius: '9999px',
              fontSize: '20px',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            {dish.category}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h1
            style={{
              fontSize: '68px',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {dish.name}
          </h1>
          <p
            style={{
              fontSize: '26px',
              color: '#94a3b8',
              lineHeight: 1.4,
              margin: 0,
              maxWidth: '900px',
            }}
          >
            {dish.description}
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #1e293b', paddingTop: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '48px', fontWeight: 900, color: '#ea580c' }}>
              {dish.price}
            </span>
            <span style={{ fontSize: '24px', fontWeight: 700, color: '#f97316' }}>
              ETB
            </span>
          </div>

          <span style={{ fontSize: '22px', color: '#64748b', fontWeight: 600 }}>
            Order online at addiseats.et
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
