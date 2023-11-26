const hh = ["8a77c62983c776d67d89987047c5b24d","557dc7df32939fd92777203bbdba9e8d","225ead8337836aa15ec3e0f3e748c508","b7060e01da693369ba7c5f665dff212d","acea856f2dc8e4631d933157ab89faf0","922b3941ad1d72ed4ebe4638b6d207c1","19fd3a70324090d466c825aeda346d69","ab886a6c0599752c3f5828e4f1e36c6a","502a9ccd9aff42f8284ba4a850385b54","3d8300f31a6e618bad1f08871f9d099b","58b17b062fde73228c1f846f324b3fd4","56840b571d3dba1eda93a2a5bdeb50c9"]

function getRandomText(texts) {
  const randomIndex = Math.floor(Math.random() * texts.length);
  return texts[randomIndex];
}

async function acak(){
    return await getRandomText(hh)
}
module.exports = acak;