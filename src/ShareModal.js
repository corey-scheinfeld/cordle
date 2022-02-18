const ShareModal = ({ isVisible, hideModal, grid }) => {
  const onShareClick = async (e) => {
    e.stopPropagation();
    console.log(grid);
    console.log(navigator.share);
    if (navigator.share) {
      console.log("in share");
      await navigator.share(grid);
      
    } else {
      navigator.clipboard.writeText(grid);
      alert("Copied to clipboard \n" + grid);
    }
  };
  return (
    <>
      <button
        onClick={async (e) => await onShareClick(e)}
        style={{
          display: !isVisible && "none",
          borderRadius: 4,
          padding: "4 1",
          height: 30,
          width: 80,
          fontSize: 15,
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
