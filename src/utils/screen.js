(function() {
  function setRem() {
    let htmlWidth =
      document.documentElement.clientWidth || document.body.clientWidth;

    let htmlDom = document.getElementsByTagName("html")[0];

    htmlDom.style.fontSize =
      htmlWidth / 10 > 75 ? "75px" : htmlWidth / 10 + "px"; // 设置1rem最大不超过75px

    // htmlDom.style.fontSize = htmlWidth / 10 + 'px'; // 原先1rem等于屏幕宽度除以10
  }
  setRem(); // 初始化
  window.onresize = function() {
    setRem();
  };
})();
