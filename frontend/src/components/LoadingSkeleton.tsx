import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const LoadingSkeleton = () => {
  return (
    <SkeletonGrid>
      {[...Array(8)].map((_, i) => (
        <SkeletonCard key={i}>
          <SkeletonImage />
          <SkeletonContent>
            <SkeletonTitle />
            <SkeletonSubtitle />
          </SkeletonContent>
        </SkeletonCard>
      ))}
    </SkeletonGrid>
  );
};

const SkeletonGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const SkeletonCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const SkeletonImage = styled.div`
  height: 12rem; /* h-48 equivalent */
  background-color: #e5e7eb; /* bg-gray-200 */
`;

const SkeletonContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SkeletonTitle = styled.div`
  height: 1.25rem; /* h-5 */
  background-color: #e5e7eb;
  border-radius: 0.25rem;
  width: 75%; /* w-3/4 */
`;

const SkeletonSubtitle = styled.div`
  height: 1rem; /* h-4 */
  background-color: #e5e7eb;
  border-radius: 0.25rem;
  width: 50%; /* w-1/2 */
`;

export default LoadingSkeleton;