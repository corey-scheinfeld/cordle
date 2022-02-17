const ShareModal = ({ isVisible, hideModal, grid }) => {
  const onShareClick = async (e) => {
    e.stopPropagation();
    console.log(grid);
    if (navigator.share) {
      await navigator.share(grid);
    } else {
      navigator.clipboard.writeText(grid);
      alert("Copied to clipboard \n" + grid);
    }
    hideModal();
  };
  return (
    <>
      <button
        onClick={async (e) => await onShareClick(e)}
        style={{
          display: !isVisible && "none",
          borderRadius: 4,
          padding: "4 1",
          height: 72,
          width: 175,
          fontSize: 24,
          backgroundColor: "#538d4e",
          border: "none",
          fontWeight: "bolder",
          color: "white",
        }}
      >
        SHARE
      </button>
    </>
  );
};

export default ShareModal;
