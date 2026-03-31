import { useEffect, useCallback } from 'react';
import { X, Trash2, ShoppingCart, AlertCircle } from 'lucide-react';
import type { ShoppingListItem } from '../types';
import styled from 'styled-components';

interface ShoppingListModalProps {
  items: ShoppingListItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveItem: (name: string) => void;
  onClearList: () => void;
}

const ShoppingListModal = ({
  items,
  isOpen,
  onClose,
  onRemoveItem,
  onClearList,
}: ShoppingListModalProps) => {
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null; // Fixed this - was missing null

  return (
    <ModalOverlay role="dialog" aria-modal="true" aria-labelledby="shopping-list-title">
      <Backdrop onClick={onClose} />
      
      <ModalContainer>
        <ModalHeader>
          <HeaderLeft>
            <ShoppingCart style={{ height: '1.5rem', width: '1.5rem', color: '#2563eb' }} />
            <ModalTitle id="shopping-list-title">Shopping List</ModalTitle>
            <ItemBadge>{items.length} items</ItemBadge>
          </HeaderLeft>
          
          <CloseButton onClick={onClose} aria-label="Close modal">
            <X style={{ height: '1.5rem', width: '1.5rem' }} />
          </CloseButton>
        </ModalHeader>

        <Content>
          {items.length === 0 ? (
            <EmptyState>
              <AlertCircle style={{ height: '4rem', width: '4rem', color: '#d1d5db', margin: '0 auto 1rem' }} />
              <EmptyText>Your shopping list is empty</EmptyText>
              <EmptySubtext>Add ingredients from recipes to get started</EmptySubtext>
            </EmptyState>
          ) : (
            <ItemList>
              {items.map((item) => (
                <ListItem key={item.name}>
                  <ItemInfo>
                    <ItemName>{item.name}</ItemName>
                    {item.measures.length > 0 && (
                      <ItemMeasures>({item.measures.map(m => m.original).join(', ')})</ItemMeasures>
                    )}
                  </ItemInfo>
                  <RemoveButton 
                    onClick={() => onRemoveItem(item.name)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 style={{ height: '1.25rem', width: '1.25rem' }} />
                  </RemoveButton>
                </ListItem>
              ))}
            </ItemList>
          )}
        </Content>

        {items.length > 0 && (
          <Footer>
            <ClearButton onClick={onClearList}>
              <Trash2 style={{ height: '1.25rem', width: '1.25rem' }} />
              <span>Clear All Items</span>
            </ClearButton>
          </Footer>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
};

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
`;

const ModalContainer = styled.div`
  position: relative;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 42rem; /* max-w-2xl */
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
`;

const ItemBadge = styled.span`
  background-color: #dbeafe;
  color: #1d4ed8;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const CloseButton = styled.button`
  padding: 0.5rem;
  border: none;
  background: transparent;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 150ms ease;
  
  &:hover {
    background-color: #f3f4f6;
  }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;
`;

const EmptyText = styled.p`
  color: #6b7280;
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
`;

const EmptySubtext = styled.p`
  color: #9ca3af;
  margin-top: 0.5rem;
`;

const ItemList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  transition: background-color 150ms ease;
  
  &:hover {
    background-color: #f3f4f6;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.span`
  font-weight: 500;
  color: #111827;
`;

const ItemMeasures = styled.span`
  color: #4b5563;
  margin-left: 0.5rem;
`;

const RemoveButton = styled.button`
  padding: 0.5rem;
  color: #ef4444;
  border: none;
  background: transparent;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 150ms ease;
  
  &:hover {
    color: #b91c1c;
    background-color: #fef2f2;
  }
`;

const Footer = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
`;

const ClearButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #ef4444;
  color: #ef4444;
  background: transparent;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 150ms ease;
  
  &:hover {
    background-color: #fef2f2;
  }
`;

export default ShoppingListModal;