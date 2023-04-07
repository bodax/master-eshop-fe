import React from 'react';
import MainPageDescription from '../../components/MainPageDescription/index.jsx';
import ProductCharacteristics from './ProductCharacteristics';
import ProductSlider from '../../components/ProductSlider';

import emptyPhoto from '../../assets/noimg.jpeg';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import {
    ProductPageAddToCartBtn,
    ProductPageButtonsContainer,
    ProductPageCategory,
    ProductPageCompareBtn,
    ProductPageContainer,
    ProductPageDiscount,
    ProductPageDiscountPercent,
    ProductPageGlobalInfo,
    ProductPageGlobalInfoP,
    ProductPageId,
    ProductPageInformation,
    ProductPageInformationContainer,
    ProductPageMainFotoContainer,
    ProductPageMainPhoto,
    ProductPageModel,
    ProductPageOldPrice,
    ProductPagePhoto,
    ProductPagePhotoContainer,
    ProductPagePhotosBlock,
    ProductPagePhotosContainer,
    ProductPagePrice,
    ProductPageProductContant,
    ProductPageShareContainer,
    ProductPageShareLinks,
    ProductPaheShareP,
} from './ProductPageElements.js';

import {AiOutlinePlusCircle} from 'react-icons/ai';
import {FiShoppingCart} from 'react-icons/fi';
import {TbTruckDelivery} from 'react-icons/tb';
import {FaMoneyBillWave} from 'react-icons/fa';
import {BsUmbrellaFill} from 'react-icons/bs';

import {
    FacebookIcon,
    FacebookShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    ViberIcon,
    ViberShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from 'react-share';

import {useDispatch, useSelector} from 'react-redux';
import {clearProductInfo, fetchProductPageInformation,} from '../../redux/Slicess/homeSlice.js';
import {useLocation} from 'react-router-dom';
import {addItemToCart} from '../../redux/Slicess/cartSlice2.js';
import ProductSkeleton from '../../components/Skeleton/ProductPageInfo.jsx';
import SEO from '../../components/SEO/index.jsx';
import {useTranslation} from 'react-i18next';
import {addProductToCompare} from '../../redux/Slicess/compareSlice.js';
import {toast} from 'react-toastify';
import {Constants} from "../../utils/Constants";

const ProductPage = () => {
    const shareUrl = window.location.href;
    const dispatch = useDispatch();
    const imagePath = Constants.imagePath;
    const product_url = useLocation().pathname.replace('/tovar_', '');

    const {
        product_information,
        photos,
        related_products,
        characteristics,
        productStatus,
        description,
        meta,
    } = useSelector((state) => state.home);
    const {language} = useSelector((state) => state.language);

    const [img, setImg] = React.useState(null);

    React.useEffect(() => {
        dispatch(fetchProductPageInformation({product_url}));
        window.scrollTo(0, 0);

        return () => {
            dispatch(clearProductInfo());
        };
    }, [product_url, language, dispatch]);

    React.useEffect(() => {
        setImg(product_information.filename);
    }, [product_information?.filename]);

    const {t} = useTranslation('common');

    const notify = (message) => {
        toast.success(message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
        });
    };

    return (
        <>
            <SEO
                title={meta.meta_title}
                description={meta.met_description}
                keywords={meta.meta_keywords}
            />
            <ProductPageContainer>
                <ProductPageProductContant>
                    <ProductPagePhotosBlock>
                        <Zoom>
                            <ProductPageMainFotoContainer>
                                {product_information.product_id && img ? (
                                    <ProductPageMainPhoto
                                        width='450'
                                        height='450'
                                        src={`${imagePath}/product/${product_information.product_id}/${img}`}
                                    />
                                ) : (
                                    <ProductPageMainPhoto src={emptyPhoto}/>
                                )}
                            </ProductPageMainFotoContainer>
                        </Zoom>

                        <ProductPagePhotosContainer>
                            {productStatus === 'success' &&
                                photos.map((el) => (
                                    <ProductPagePhotoContainer
                                        key={el.filename}
                                        onMouseEnter={() => setImg(el.filename)}
                                    >
                                        <ProductPagePhoto
                                            src={`${imagePath}/product/${product_information.product_id}/${el.filename}`}
                                        />
                                    </ProductPagePhotoContainer>
                                ))}
                        </ProductPagePhotosContainer>
                    </ProductPagePhotosBlock>
                    {productStatus !== 'success' ? (
                        <ProductSkeleton/>
                    ) : (
                        <ProductPageInformationContainer>
                            <ProductPageInformation>
                                <ProductPageId>
                                    {`#${product_information.product_id}`}
                                </ProductPageId>
                                <ProductPageCategory>
                                    {product_information.category_name}
                                </ProductPageCategory>
                                <ProductPageModel>
                                    {product_information.product_name}
                                </ProductPageModel>
                                <ProductPagePrice>
                                    {`${
                                        product_information.discount_percent
                                            ? Math.ceil(
                                                product_information.base_price -
                                                (product_information.base_price / 100) *
                                                product_information.discount_percent
                                            )
                                            : Math.ceil(product_information.base_price)
                                    } ${product_information.iso}`}
                                </ProductPagePrice>
                                {product_information?.discount_percent ? (
                                    <ProductPageDiscount>
                                        <ProductPageOldPrice>{`${Math.ceil(
                                            product_information.base_price
                                        )} ${product_information.iso}`}</ProductPageOldPrice>
                                        <ProductPageDiscountPercent>{`-${Math.ceil(
                                            product_information.discount_percent
                                        )}%`}</ProductPageDiscountPercent>
                                    </ProductPageDiscount>
                                ) : (
                                    <></>
                                )}
                                <ProductPageButtonsContainer>
                                    <ProductPageAddToCartBtn
                                        onClick={() => {
                                            dispatch(addItemToCart(product_information));
                                            notify('Товар добавлен в корзину!');
                                        }}
                                    >
                                        <FiShoppingCart/>
                                        {t('productPage.addItemToCart')}
                                    </ProductPageAddToCartBtn>
                                    <ProductPageCompareBtn
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(
                                                addProductToCompare({
                                                    product_id: product_information.product_id,
                                                    category_id: product_information.category_id,
                                                })
                                            );
                                            notify('Товар добавлен к сравнению!');
                                        }}
                                    >
                                        <AiOutlinePlusCircle/>
                                        {t('productPage.addItemToCompare')}
                                    </ProductPageCompareBtn>
                                </ProductPageButtonsContainer>
                            </ProductPageInformation>
                            <ProductPageGlobalInfo>
                                <ProductPageGlobalInfoP>
                                    <TbTruckDelivery/>
                                    {t('product_page.delivery')}
                                </ProductPageGlobalInfoP>
                                <ProductPageGlobalInfoP>
                                    <FaMoneyBillWave/>
                                    {t('product_page.pay')}
                                </ProductPageGlobalInfoP>
                                <ProductPageGlobalInfoP>
                                    <BsUmbrellaFill/>
                                    {t('product_page.guarantee')}
                                </ProductPageGlobalInfoP>
                            </ProductPageGlobalInfo>
                            <ProductPageShareContainer>
                                <ProductPaheShareP>{t('share.share')}</ProductPaheShareP>
                                <ProductPageShareLinks>
                                    <FacebookShareButton url={shareUrl}>
                                        <FacebookIcon size={30}/>
                                    </FacebookShareButton>

                                    <TwitterShareButton url={shareUrl}>
                                        <TwitterIcon size={30}/>
                                    </TwitterShareButton>

                                    <ViberShareButton url={shareUrl}>
                                        <ViberIcon size={30}/>
                                    </ViberShareButton>

                                    <TelegramShareButton url={shareUrl}>
                                        <TelegramIcon size={30}/>
                                    </TelegramShareButton>

                                    <WhatsappShareButton url={shareUrl}>
                                        <WhatsappIcon size={30}/>
                                    </WhatsappShareButton>
                                </ProductPageShareLinks>
                            </ProductPageShareContainer>
                        </ProductPageInformationContainer>
                    )}
                </ProductPageProductContant>
            </ProductPageContainer>
            {productStatus === 'success' && (
                <>
                    <ProductCharacteristics
                        description={description.description}
                        characteristics={characteristics}
                    />
                    <ProductSlider
                        title={t('sliders_titles.buy_also')}
                        items={related_products}
                        status={productStatus}
                    />
                </>
            )}
            <MainPageDescription/>
        </>
    );
};

export default ProductPage;
