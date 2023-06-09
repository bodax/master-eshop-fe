import React from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {
    CategoriesPageContainer,
    CategoriesPageH1,
    CategoriesPageImageContainer,
    CategoriesPageItem,
    CategoriesPageWrap,
    CategoryItemImage,
    CategoryItemLink,
    CategoryPageBarrier,
} from './CategoriesPageElements';
import {Constants} from "../../utils/Constants";


const CategoriesPage = () => {
  const { categories } = useSelector((state) => state.home);
  const { t } = useTranslation('common');
  const imagePath = Constants.imagePath;
  const { language } = useSelector((state) => state.language);

  return (
    <CategoriesPageContainer>
      <CategoriesPageH1>
        <CategoryPageBarrier />
        {t('header.catalog')}
      </CategoriesPageH1>
      <CategoriesPageWrap>
        {categories &&
          categories[language] &&
          categories[language]
            .filter((el) => el.parent_id === 0)
            .map((el) => (
              <CategoriesPageItem key={el.category_id} to={`/group_${el.url}`}>
                <CategoriesPageImageContainer>
                  <CategoryItemImage
                    src={`${imagePath}/category/${el.category_id}/${el.filename}`}
                  />
                </CategoriesPageImageContainer>
                <CategoryItemLink>{el.name}</CategoryItemLink>
              </CategoriesPageItem>
            ))}
      </CategoriesPageWrap>
    </CategoriesPageContainer>
  );
};

export default CategoriesPage;
