import {
  SkeletonContainer,
  SkeletonImage,
  SkeletonText,
  SkeletonUserPhoto,
  SkeletonNameUser,
} from "./SkeletonAsideSuggest.js";

const SkeletonAsideSuggest = () => {
  return (
    <SkeletonContainer>
      <SkeletonImage className="skeleton" />
      <SkeletonUserPhoto className="skeleton" />
      <SkeletonNameUser>
        <SkeletonText className="skeleton title" width="60%" />
        <SkeletonText className="skeleton username" width="40%" />
      </SkeletonNameUser>
    </SkeletonContainer>
  );
};

export default SkeletonAsideSuggest;
