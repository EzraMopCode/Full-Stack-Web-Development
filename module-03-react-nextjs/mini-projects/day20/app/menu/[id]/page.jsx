import { notFound } from 'next/navigation';
import { menuData } from '../../../data/menuData';
import DishDetailClient from '../../../components/DishDetailClient';

export function generateStaticParams() {
  return menuData.map((dish) => ({
    id: dish.id.toString(),
  }));
}

// Day 19 Requirement 3: generateMetadata using name, price, summary & canonical URL
export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = menuData.find((d) => d.id === parseInt(id));

  if (!dish) {
    return {
      title: 'Dish Not Found',
      description: 'The requested Ethiopian dish could not be found.'
    };
  }

  const title = `${dish.name} (${dish.price} ETB)`;
  const description = `${dish.name} — ${dish.description} Order authentic ${dish.name} hot and fresh in Addis Ababa for ${dish.price} ETB.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/menu/${dish.id}`,
    },
    openGraph: {
      title: `${dish.name} | Addis Eats`,
      description,
      type: 'article',
      url: `/menu/${dish.id}`,
      images: [
        {
          url: `/menu/${dish.id}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${dish.name} - Authentic Ethiopian Cuisine`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${dish.name} | Addis Eats`,
      description,
      images: [`/menu/${dish.id}/opengraph-image`],
    },
  };
}

export default async function DishDetailPage({ params }) {
  const { id } = await params;
  const dish = menuData.find((d) => d.id === parseInt(id));

  if (!dish) {
    notFound();
  }

  // Day 19 Requirement 5: MenuItem JSON-LD generated from the exact same dish object
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MenuItem',
    name: dish.name,
    description: dish.description,
    image: `https://addiseats.et${dish.image}`,
    offers: {
      '@type': 'Offer',
      price: dish.price,
      priceCurrency: 'ETB',
      availability: 'https://schema.org/InStock',
    },
    suitableForDiet:
      dish.category === 'Vegan' ? 'https://schema.org/VeganDiet' : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DishDetailClient dish={dish} />
    </>
  );
}
