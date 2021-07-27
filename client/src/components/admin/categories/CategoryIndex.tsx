import React from 'react';
import { fetchCategories } from '../../../app/admin/adminActions';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { CategoryTable } from './CategoryTable';

interface CategoryIndexProps {}

export const CategoryIndex: React.FC<CategoryIndexProps> = (): JSX.Element => {
  const { categories } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchCategories({ callback: () => {} }));
  }, [dispatch]);

  return (
    <React.Fragment>
      <CategoryTable categories={categories} />
    </React.Fragment>
  );
};
