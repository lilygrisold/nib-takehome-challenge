import { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import type { Toast as ToastType } from '../types';
import styled, { css } from 'styled-components';

interface ToastProps {
  toast: ToastType;
  onClose: (id: string) => void;
}

const Toast = ({ toast, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle style={{ height: '1.25rem', width: '1.25rem', color: '#22c55e' }} />;
      case 'error':
        return <XCircle style={{ height: '1.25rem', width: '1.25rem', color: '#ef4444' }} />;
      case 'info':
        return <Info style={{ height: '1.25rem', width: '1.25rem', color: '#3b82f6' }} />;
      default:
        return null;
    }
  };

  return (
    <ToastContainer $type={toast.type} role="alert">
      {getIcon()}
      <Message>{toast.message}</Message>
      <CloseButton onClick={() => onClose(toast.id)} aria-label="Close notification">
        <X style={{ height: '1rem', width: '1rem' }} />
      </CloseButton>
    </ToastContainer>
  );
};

const getBackgroundStyles = ($type: 'success' | 'error' | 'info') => {
  switch ($type) {
    case 'success':
      return css`
        background-color: #f0fdf4;
        border-color: #bbf7d0;
      `;
    case 'error':
      return css`
        background-color: #fef2f2;
        border-color: #fecaca;
      `;
    case 'info':
      return css`
        background-color: #eff6ff;
        border-color: #bfdbfe;
      `;
    default:
      return '';
  }
};

const ToastContainer = styled.div<{ $type: 'success' | 'error' | 'info' }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  ${props => getBackgroundStyles(props.$type)}
`;

const Message = styled.span`
  flex: 1;
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
`;

const CloseButton = styled.button`
  padding: 0.25rem;
  background: transparent;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  color: #6b7280;
  transition: background-color 150ms ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export default Toast;