import {
  SkeletonCard,
  SkeletonBanner,
  SkeletonInfoUser,
  SkeletonBlock,
  SkeletonTitle,
  SkeletonTags,
} from "./SkeletonCardDonationItem"

export default function SkeletonCardDonation() {
  return (
    <SkeletonCard>
      <SkeletonInfoUser>
        <SkeletonBlock className="avatar" />
        <div className="text">
          <SkeletonBlock className="line" />
          <SkeletonBlock className="line" />
        </div>
      </SkeletonInfoUser>
      <SkeletonTitle />
      <SkeletonBanner />
      <SkeletonTags>
        <SkeletonBlock className="tag" />
        <SkeletonBlock className="tag" />
        <SkeletonBlock className="tag" />
      </SkeletonTags>
    </SkeletonCard>
  );
}
