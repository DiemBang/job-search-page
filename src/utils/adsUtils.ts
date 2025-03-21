import { ICategory } from '../types/occupation-types';
import { IVisibleSubcategories } from '../types/types';
import { IQuery } from '../types/types';

/**
 * adds new keys selected/active for categories and active for subcategories
 * @param {ICategory[]} categories
 * @returns {ICategory[]}
 */
export const addSelectedAndActiveKeys = (
  categories: ICategory[]
): ICategory[] => {
  return categories.map((category) => ({
    ...category,
    selected: false,
    active: false,
    narrower: category.narrower.map((subcategory) => ({
      ...subcategory,
      active: false,
    })),
  }));
};

/**
 * takes queries and puts them together to one query url string
 * @param {IQuery[]} queries
 * @returns {string} - url query endpoint
 */
export const getQueryStringFromQueries = (queries: IQuery[]): string => {
  return queries
    .map((q) => {
      if (Array.isArray(q.value)) {
        return q.value.map((v) => `${q.query}${v}`).join('&');
      }
      return q.value ? `${q.query}${q.value}` : '';
    })
    .filter(Boolean)
    .join('&');
};

/**
 * checks if a category has subcategory that is checked / active and then activatis the category
 * @param {ICategory[]} categories
 * @returns {ICategory[]}
 */
export const updateActiveState = (categories: ICategory[]): ICategory[] => {
  return categories.map((category) => {
    const hasActiveSubCategory = category.narrower.some(
      (subItem) => subItem.active
    );
    return { ...category, active: hasActiveSubCategory };
  });
};

/**
 * toggles if a category by checking id, if not set false
 * @param {ICategory[]} categories
 * @param {string} taxonomyId - category id
 * @returns
 */
export const toggleCategorySelectedState = (
  categories: ICategory[],
  taxonomyId: string
): ICategory[] => {
  return categories.map((category) => {
    const isSelected = category.id === taxonomyId;

    return {
      ...category,
      selected: isSelected ? !category.selected : false,
    };
  });
};

export const setActiveSubCategories = (
  taxonomyId: string,
  setSubCategories: React.Dispatch<React.SetStateAction<string[]>>
) => {
  setSubCategories((prevSubC) => {
    if (prevSubC.includes(taxonomyId)) {
      return prevSubC.filter((id) => id !== taxonomyId);
    } else {
      return [...prevSubC, taxonomyId];
    }
  });
};

/**
 * toggles a subcategory by its ids
 * @param {ICategory[]} categories
 * @param {string} taxonomyId
 * @returns {Category[]}
 */
export const toggleSubcategoryActiveState = (
  categories: ICategory[],
  taxonomyId: string
): ICategory[] => {
  return categories.map((category) => ({
    ...category,
    narrower: category.narrower.map((subItem) => {
      if (subItem.id === taxonomyId) {
        return {
          ...subItem,
          active: !subItem.active,
        };
      }
      return subItem;
    }),
  }));
};

export const resetSubCategoriesOfCategory = (
  categoryId: string | null,
  categories: ICategory[],
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>,
  setActiveSubCategories: React.Dispatch<React.SetStateAction<string[]>>,
  queryKey: string,
  updateQuery: (queryKey: string, value: string[]) => void,
  activeSubCategories: string[]
) => {
  if (!categoryId) {
    throw new Error('Could not find the category id');
  }

  setCategories(
    categories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          narrower: category.narrower.map((subc) => {
            return { ...subc, active: false };
          }),
        };
      } else {
        return category;
      }
    })
  );

  const filteredSubcategories = activeSubCategories.filter(
    (subcatId) =>
      !categories
        .find((category) => category.id === categoryId)
        ?.narrower.some((narrower) => narrower.id === subcatId)
  );

  setActiveSubCategories(filteredSubcategories);
  updateQuery(queryKey, filteredSubcategories);
};

export const resetAllCategoriesAndSubCategories = (
  categories: ICategory[],
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>,
  setActiveSubCategories: React.Dispatch<React.SetStateAction<string[]>>,
  queryKey: string,
  updateQuery: (queryKey: string, value: string[]) => void
) => {
  setCategories(
    categories.map((category) => {
      return {
        ...category,
        selected: false,
        active: false,
        narrower: category.narrower.map((subc) => {
          return { ...subc, active: false };
        }),
      };
    })
  );

  setActiveSubCategories([]);
  updateQuery(queryKey, []);
};

/**
 * toggles all subcategories
 * @param {IVisibleSubcategories | null} visibleState
 * @param {React.Dispatch<React.SetStateAction<IVisibleSubcategories | null>>} setVisibleState
 * @returns {IVisibleSubcategories}
 */
export const toggleVisibilityOfAllSubcategories = (
  visibleState: IVisibleSubcategories | null,
  setVisibleState: React.Dispatch<
    React.SetStateAction<IVisibleSubcategories | null>
  >
) => {
  if (!visibleState || !visibleState.visibleSubcategories) {
    return;
  }

  setVisibleState({
    ...visibleState,
    visibleSubcategories: visibleState.visibleSubcategories.map((subc) => ({
      ...subc,
      active: !subc.active,
    })),
  });
};

/**
 * toggles the selected state of the category
 * finds the categories subcategories and sets them as visible so the user can see them on the right side of the dropdown
 * @param {string} taxonomyId
 * @param {ICategory[]} items
 * @param {React.Dispatch<React.SetStateAction<ICategory[]>>} setItems
 * @param {React.Dispatch<React.SetStateAction<IVisibleSubcategories | null>>} setVisible
 */
export const handleClickOnCategory = (
  taxonomyId: string,
  items: ICategory[],
  setItems: React.Dispatch<React.SetStateAction<ICategory[]>>,
  setVisible: React.Dispatch<React.SetStateAction<IVisibleSubcategories | null>>
) => {
  const updatedItems = toggleCategorySelectedState(items, taxonomyId);
  const selectedItem = updatedItems.find((item) => item.id === taxonomyId);
  setVisible(
    selectedItem
      ? {
          categoryId: taxonomyId,
          visibleSubcategories: selectedItem.narrower,
        }
      : null
  );
  setItems(updatedItems);
};
