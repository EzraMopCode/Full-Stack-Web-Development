import { ImageResponse } from 'next/og';

export const alt = 'Addis Eats — Authentic Ethiopian Cuisine Delivered';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          padding: '40px 60px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '24px',
              backgroundColor: '#ea580c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '28px',
              fontWeight: 'bold',
            }}
          >
            AE
          </div>
          <span
            style={{
              fontSize: '32px',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-1px',
            }}
          >
            Addis<span style={{ color: '#ea580c' }}>Eats</span>
          </span>
        </div>

        <h1
          style={{
            fontSize: '64px',
            fontWeight: 900,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.15,
            margin: '0 0 24px 0',
            maxWidth: '900px',
          }}
        >
          Authentic Ethiopian Cuisine Delivered Hot &amp; Fresh
        </h1>

        <p
          style={{
            fontSize: '28px',
            color: '#94a3b8',
            textAlign: 'center',
            margin: '0 0 36px 0',
            maxWidth: '800px',
          }}
        >
          From sizzling Tibs to rich Shiro and Doro Wat — ordered online in seconds.
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: '#ea580c',
              color: '#ffffff',
              padding: '14px 32px',
              borderRadius: '9999px',
              fontSize: '22px',
              fontWeight: 700,
            }}
          >
            Order at addiseats.et
          </div>
          <div
            style={{
              color: '#f97316',
              fontSize: '20px',
              fontWeight: 600,
            }}
          >
            Fast Delivery across Addis Ababa
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
