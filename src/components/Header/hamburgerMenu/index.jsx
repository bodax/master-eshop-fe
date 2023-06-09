import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MenuToggle } from './menuToggle';
import { NavMenu } from './navMenu';
import { AuthContext } from '../../../context/authContext';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../../redux/Slicess/languageSlice';

export function HamburgerMenu() {
  const { t, i18n } = useTranslation('common');
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { language } = useSelector((state) => state.language);
  const { currentUser, logout } = React.useContext(AuthContext);

  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  const changeLanguage = (lan) => {
    i18n.changeLanguage(lan);
    const language = localStorage.getItem('i18nextLng');
    dispatch(setLanguage(language));
  };

  return (
    <HamburgerMenuContainer>
      <MenuToggle toggle={toggleMenu} isOpen={isOpen} />
      <MenuContainer
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={menuVariants}
        transition={menuTransition}
      >
        <TopContainer>
          <LoginButton
            initial={false}
            animate={isOpen ? 'show' : 'hide'}
            variants={commonVariants}
            transition={commonTransition}
          >
            <IconContainer>
              <FontAwesomeIcon icon={faUserCircle} />
            </IconContainer>
            {currentUser ? (
              <Link onClick={logout}>{t('header.logout')}</Link>
            ) : (
              <Link to='/login'>{t('header.login')}</Link>
            )}
          </LoginButton>
          <LoginButton
            initial={false}
            animate={isOpen ? 'show' : 'hide'}
            variants={commonVariants}
            transition={commonTransition}
          >
            <div className={styles.languageContainer}>
              <div
                className={
                  language === 'ua'
                    ? `${styles.languageItem} ${styles.active}`
                    : styles.languageItem
                }
                onClick={() => changeLanguage('ua')}
              >
                Укр
              </div>
              <div
                className={
                  language === 'ru'
                    ? `${styles.languageItem} ${styles.active}`
                    : styles.languageItem
                }
                onClick={() => changeLanguage('ru')}
              >
                Рус
              </div>
            </div>
          </LoginButton>
        </TopContainer>
        <ContentContainer>
          <NavMenu isOpen={isOpen} />
        </ContentContainer>
      </MenuContainer>
    </HamburgerMenuContainer>
  );
}

const HamburgerMenuContainer = styled.div`
  display: flex;
`;

const HamburgerIcon = styled.div`
  color: ${({ reverseColor }) => (reverseColor ? '#000' : '#fff')};
  cursor: pointer;
  z-index: 99;
  transition: all 250ms ease-in-out;
`;

const MenuContainer = styled(motion.div)`
  min-width: 300px;
  max-width: 44%;
  height: 100%;
  background-color: #fff;
  box-shadow: -2px 0 2px rgba(15, 15, 15, 0.3);
  z-index: 90;
  position: fixed;
  top: 0;
  right: 0;
  transform: translateX(4em);
  user-select: none;
  padding: 1em 2.5em;
`;

const TopContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const IconContainer = styled.div`
  font-size: 16px;
  color: #555;
  padding-right: 5px;
`;

const LoginButton = styled(motion.button)`
  border: 0;
  background: transparent;
  color: #555;
  font-size: 14px;
  font-weight: 900;
  transition: all 250ms ease-in-out;
  display: flex;
  cursor: pointer;
  padding: 5px 12px;

  &:hover {
    color: #666;
  }

  &:focus {
    outline: none;
  }

  &:not(:last-of-type) {
    border-right: 1px solid #b4b4b4;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1em;
`;

const menuVariants = {
  open: {
    transform: 'translateX(3%)',
  },
  closed: {
    transform: 'translateX(103%)',
  },
};

const menuTransition = {
  type: 'spring',
  duration: 1,
  stiffness: 33,
  delay: 0.1,
};

const commonVariants = {
  show: {
    transform: 'translateX(0em)',
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.01,
    },
  },
  hide: {
    transform: 'translateX(5em)',
    opacity: 0,
  },
};

const commonTransition = { type: 'spring', duration: 0.05 };
