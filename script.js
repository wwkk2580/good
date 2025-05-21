const repo = "wwkk2580/good";
const branch = "main";  // 或者是 "master"
const imageDir = "images";  // 存放图片的文件夹
const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

async function fetchImageList() {
  const apiUrl = `https://api.github.com/repos/${repo}/contents/${imageDir}?ref=${branch}`;
  const response = await fetch(apiUrl);
  const files = await response.json();
  // 过滤图片文件
  return files
    .filter(file => imageExtensions.some(ext => file.name.toLowerCase().endsWith(ext)))
    .map(file => file.download_url);
}

async function loadRandomImage() {
  const images = await fetchImageList();
  if (images.length === 0) {
    alert("没有找到图片");
    return;
  }
  const randomIndex = Math.floor(Math.random() * images.length);
  document.getElementById("random-image").src = images[randomIndex];
}

// 初始加载
loadRandomImage();
