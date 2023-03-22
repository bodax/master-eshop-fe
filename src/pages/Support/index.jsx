import React from 'react';
import styled from 'styled-components';

const Support = () => {
  return (
    <Container>
      <Header>Support</Header>
    </Container>
  );
};

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  min-height: 50vh;
`;

const Header = styled.h2`
  text-align: center;
`;

export default Support;
