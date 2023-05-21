import { PropsWithChildren } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';

import Grid from '@amalg/grid';
import { Text } from '@amalg/text';
import { Breakpoints } from '@amalg/theme';
import styled from '@emotion/styled';

export interface ModalProps {
  onClose: () => void;
  open: boolean;
  fullScreen?: boolean;
  title?: string;
}

const StyledOverlay = styled(Grid)<{ open: ModalProps['open'] }>`
  pointer-events: ${({ open }) => (open ? 'all' : 'none')};
  background: ${({ theme }) => theme.BLACK}cc;
  opacity: ${({ open }) => (open ? 1 : 0)};
  position: absolute;
  z-index: 999;
  height: 100%;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
`;

const StyledModal = styled(Grid)<{ fullScreen?: boolean }>`
  box-shadow: 0.5rem 0.5rem 0 ${({ theme }) => theme.DARK};
  border: 1px solid ${({ theme }) => theme.LIGHT};
  max-height: ${Breakpoints.MD};
  max-width: ${Breakpoints.LG};
  height: 100%;
  width: 100%;
`;

export default function Modal({
  fullScreen,
  children,
  onClose,
  title,
  open,
}: PropsWithChildren<ModalProps>) {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();

    onClose();
  };

  return (
    <StyledOverlay
      open={open}
      align="center"
      justify="center"
      onClick={handleClose}
    >
      <StyledModal
        onClick={(e) => e.stopPropagation()}
        fullScreen={fullScreen}
        alignSelf="center"
        m="1rem auto"
        bg="BLACK"
        p="1rem"
      >
        <Grid xs="1fr auto" align="center">
          {title ? <Text.H3>{title}</Text.H3> : <span />}
          <AiFillCloseCircle
            onClick={handleClose}
            fontSize="1.5rem"
            role="button"
          />
        </Grid>
        {children}
      </StyledModal>
    </StyledOverlay>
  );
}
