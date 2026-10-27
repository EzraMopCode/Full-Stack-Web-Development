import { getDishes } from '../../data/menuData';
import DishList from '../../components/DishList';
import FilterShell from '../../components/FilterShell';

export const metadata = {
  title: 'Our Menu | Addis Eats',
  description: 'Discover the authentic flavors of Addis.',
};

export default async function MenuPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const category = resolvedParams?.category || 'All';
  const query = resolvedParams?.q || '';

  const allDishes = await getDishes();
  const filteredDishes = allDishes.filter((dish) => {
    const matchesCategory = category === 'All' || dish.category === category;
    const matchesSearch = dish.name.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <FilterShell
      currentCategory={category}
      currentQuery={query}
      totalCount={filteredDishes.length}
    >
      <DishList dishes={filteredDishes} />
    </FilterShell>
  );
}
