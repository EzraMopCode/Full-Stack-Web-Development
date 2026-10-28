import { getDishes } from '../../data/menuData';
import DishList from '../../components/DishList';
import FilterShell from '../../components/FilterShell';

// Day 19 Requirement: Canonical URL on routes accepting query parameters
export const metadata = {
  title: 'Our Menu — Authentic Ethiopian Dishes',
  description: 'Explore our full selection of Ethiopian culinary traditions: slow-cooked Doro Wat, sizzling Shekla Tibs, kitfo, fasting combos, and fresh juices.',
  alternates: {
    canonical: '/menu',
  },
  openGraph: {
    title: 'Our Menu — Authentic Ethiopian Dishes | Addis Eats',
    description: 'Explore our full selection of Ethiopian culinary traditions delivered fast across Addis Ababa.',
    url: '/menu',
  },
};

export default async function MenuPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const category = resolvedParams?.category || 'All';
  const query = resolvedParams?.q || '';
  const page = parseInt(resolvedParams?.page || '1', 10);
  const limit = 6;

  const allDishes = await getDishes();
  let filteredDishes = allDishes.filter((dish) => {
    const matchesCategory = category === 'All' || dish.category === category;
    const matchesSearch = dish.name.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const total = filteredDishes.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const startIndex = (page - 1) * limit;
  const paginatedDishes = filteredDishes.slice(startIndex, startIndex + limit);

  return (
    <FilterShell
      currentCategory={category}
      currentQuery={query}
      currentPage={page}
      totalCount={total}
      totalPages={totalPages}
    >
      <DishList dishes={paginatedDishes} />
    </FilterShell>
  );
}
