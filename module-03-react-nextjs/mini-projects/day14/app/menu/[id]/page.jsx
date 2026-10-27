import { menuData } from '../../../data/menuData';
import DishDetailClient from '../../../components/DishDetailClient';

export function generateStaticParams() {
  return menuData.map((dish) => ({
    id: dish.id.toString(),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = menuData.find((d) => d.id === parseInt(id));

  if (!dish) {
    return {
      title: 'Dish Not Found | Addis Eats',
    };
  }

  return {
    title: `${dish.name} | Addis Eats`,
    description: dish.description,
  };
}

export default async function DishDetailPage({ params }) {
  const { id } = await params;
  const dish = menuData.find((d) => d.id === parseInt(id));

  return <DishDetailClient dish={dish} />;
}
