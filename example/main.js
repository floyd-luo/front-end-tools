import {TableUtils, googleAnalytics, regular, File,threeModelRenderer} from './../lib';

/*googleAnalytics();*/
document.getElementById('fileVideo').addEventListener('change', (e) => {
    const videoFile = e.target.files[0];
    File.blobToDataURL(videoFile).then(r => {
        console.log(r.videoCover);
        document.getElementById('myImages').src = r.videoCover;
    });

});

/*
let a = [];
provinceCityDistrictMap.forEach(item => {
  a.push(...item.children);
});
let b = a.map(item => {
  delete item.children;
  return item;
});
console.log(document.getElementById('app'))
document.getElementById('app').innerHTML=JSON.stringify(b);
console.log(b);
threeModelRenderer({
    imagePath: '/resource/models/obj/pose/YZ_UV_test_03.jpg',
    objPath: '/resource/models/obj/pose/Break_Pose_YZ_06.obj',
    width: 500,
    height: 400,
    containerWarp:document.body
});*/
