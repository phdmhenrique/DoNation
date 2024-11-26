import {
  SkeletonCard,
  SkeletonImage,
  SkeletonContent,
  SkeletonText,
  SkeletonButton,
  SkeletonMemberImage,
} from "./SkeletonCardGroup.js";

const SkeletonCardGroup = () => {
  return (
    <SkeletonCard>
      <SkeletonImage className="skeleton" />
      <SkeletonContent>
        <SkeletonText className="skeleton title" />
        <div style={{display: "flex", gap: "0.1rem", gridArea: "demonstrator"}}>
          <SkeletonMemberImage className="skeleton" />
          <SkeletonMemberImage className="skeleton" />
          <SkeletonMemberImage className="skeleton" />
          <SkeletonMemberImage className="skeleton" />
        </div>
        <SkeletonButton className="skeleton" />
        <SkeletonText className="skeleton description" />
        <SkeletonText className="skeleton address" />
      </SkeletonContent>
    </SkeletonCard>
  );
};

export default SkeletonCardGroup;
