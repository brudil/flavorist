import React from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';

export const Modal: React.FC<{ isOpen: boolean; onDismiss: () => void }> = ({
  isOpen,
  onDismiss,
  children,
}) => {
  return (
    <DialogOverlay
      css={{
        background: 'hsla(6, 6%, 6%, 0.43)',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: 'auto',
      }}
      isOpen={isOpen}
      onDismiss={onDismiss}
    >
      <DialogContent
        css={{
          width: '50vw',
          margin: '10vh auto',
          background: 'white',
          padding: '2rem',
          outline: 'none',
          borderRadius: 6,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
        }}
      >
        {children}
      </DialogContent>
    </DialogOverlay>
  );
};
