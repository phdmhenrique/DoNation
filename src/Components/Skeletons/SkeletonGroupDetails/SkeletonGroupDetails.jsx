import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const SkeletonWrapper = styled.div`
  width: 100%;
  min-height: 38rem;
  background-color: var(--white);
  position: relative;
`;

const SkeletonImage = styled.div`
  width: 100%;
  height: 32rem;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s infinite linear;
`;

const SkeletonUserPhoto = styled.div`
  width: 11.2rem;
  height: 11.2rem;
  border-radius: 50%;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s infinite linear;
  position: absolute;
  bottom: 10rem;
  left: 1.3rem;
`;

const SkeletonInfo = styled.div`
  width: 200px;
  height: 20px;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s infinite linear;
  margin: 0 0 1rem 12rem;
`;

const SkeletonButton = styled.div`
  width: 120px;
  height: 40px;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s infinite linear;
  border-radius: 2rem;
  position: absolute;
  right: 1.3rem;
  bottom: 13rem;
`;

const SkeletonTabs = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 2rem;
`;

const SkeletonTab = styled.div`
  width: 80px;
  height: 30px;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s infinite linear;
  border-radius: 15px;
`;

const SkeletonGroupDetails = () => {
  return (
    <SkeletonWrapper>
      <SkeletonImage />
      <SkeletonUserPhoto />
      <div style={{ padding: '20px' }}>
        <SkeletonInfo />
        <SkeletonInfo />
      </div>
      <SkeletonButton />
      <SkeletonTabs>
        <SkeletonTab />
        <SkeletonTab />
        <SkeletonTab />
        <SkeletonTab />
      </SkeletonTabs>
    </SkeletonWrapper>
  );
};

export default SkeletonGroupDetails;

