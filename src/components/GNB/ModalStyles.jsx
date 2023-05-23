const DesktopModalStyle = {
  overlay: {
    top: '0',
    right: '0',
    backgroundColor: 'none',
  },
  content: {
    position: 'absolute',
    overflow: 'auto',
    top: '76px',
    right: '52px',
    left: 'auto',
    bottom: 'auto',
    border: '1px solid #E7E9F0',
    borderRadius: '16px',
    boxShadow: '0px 4px 15px rgba(11, 14, 27, 0.08)',
    zIndex: 10,
    width: '520px',
    height: '590px',
    padding: 0,
  },
};

const TabletModalStyle = {
  overlay: {
    top: '0',
    right: '0',
    backgroundColor: 'none',
  },
  content: {
    position: 'absolute',
    overflow: 'auto',
    top: '76px',
    right: '24px',
    left: 'auto',
    bottom: 'auto',
    border: '1px solid #E7E9F0',
    borderRadius: '16px',
    boxShadow: '0px 4px 15px rgba(11, 14, 27, 0.08)',
    zIndex: 10,
    width: '520px',
    height: '590px',
    padding: 0,
  },
};

const MobileModalStyle = {
  overlay: {
    top: '0',
    right: '0',
    backgroundColor: 'none',
  },
  content: {
    position: 'absolute',
    overflow: 'auto',
    top: '76px',
    right: 'auto',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: 'auto',
    border: '1px solid #E7E9F0',
    borderRadius: '16px',
    boxShadow: '0px 4px 15px rgba(11, 14, 27, 0.08)',
    zIndex: 10,
    width: '343px',
    height: '571px',
    padding: 0,
    margin: '0 auto',
  },
};

export { DesktopModalStyle, TabletModalStyle, MobileModalStyle };
