const ShareModal = ({ isVisible, hideModal, grid }) => {
  const onShareClick = async (e) => {
    e.stopPropagation();
    console.log(grid);
    navigator.share(grid);
    hideModal();
  };
  return (
    <>
      <button
        onClick={async (e) => await onShareClick(e)}
        style={{ display: !isVisible && "none" }}
      >
        SHARE
      </button>
    </>
  );
};

export default ShareModal;
