export const shareToSns = (target) => {
  const encodedUrl = encodeURIComponent(window.location.href);
  let webUrl
  let appUrl
  switch(target){
    case 'twitter':
      webUrl=`https://twitter.com/intent/tweet?url=${encodedUrl}`
      break;
    case 'instagram':
      webUrl = `https://www.instagram.com/direct/new`;
      appUrl = "instagram://direct";
      break;
    case 'facebook':
      webUrl=`https://www.facebook.com/share.php?u=${encodedUrl}`
      break;
  }

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {

    window.location.href = appUrl;

    setTimeout(() => {
      window.open(webUrl, "_blank");
    }, 1500);
  } else {
    window.open(webUrl, "_blank");
  }
};


