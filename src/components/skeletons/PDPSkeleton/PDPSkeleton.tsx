import React from 'react'

import Shimmer from '../Shimmer'
import SkeletonElement from '../SkeletonElement'
import './pdp-skeleton.scss'

function PDPSkeleton() {
  return (
    <div data-pdp-skeleton-container>
      <Shimmer />

      <div data-pdp-skeleton-image>
        <SkeletonElement type="image" />
      </div>
      <div data-pdp-skeleton-content>
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />

        <div data-pdp-skeleton-offers>
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
        </div>

        <SkeletonElement type="badge" />

        <div data-pdp-skeleton-buttons>
          <SkeletonElement type="button" />
          <SkeletonElement type="button" />
        </div>
      </div>
    </div>
  )
}

export default PDPSkeleton
