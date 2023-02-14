const isMobile = () => {
  // looks fine on ipads and most other tablets, so exclude them
  if (window.innerWidth >= 768) return false;

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export default isMobile;
