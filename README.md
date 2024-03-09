

## 示例图：
#### （第一张图地图里的冰岩图标是用户所在位置）
<center>
<img src="https://github.com/Mengbooo/PandaBus/assets/143786942/4e21255e-0de3-455e-966e-ebeaa176c8e1" width="260px">
<img src="https://github.com/Mengbooo/PandaBus/assets/143786942/e17e9034-543b-47c2-bc02-89b77f869f72" width="260px">
<img src="https://github.com/Mengbooo/PandaBus/assets/143786942/9b9b7905-cc29-45a6-9c2e-0cc845e5e19c" width="260px">
</center>
<center>
<img src="https://github.com/Mengbooo/PandaBus/assets/143786942/833e2764-0e3d-48b5-a1a5-1c3113dbca93" width="260px">
<img src="https://github.com/Mengbooo/PandaBus/assets/143786942/9eba0947-c0ee-46a3-80bf-60ee31b646dd" width="260px">
<img src="https://github.com/Mengbooo/PandaBus/assets/143786942/08c244ec-1788-4796-abc5-39c1ab515cbd" width="260px">
</center>

---

## 目前亟待解决的问题：
- 把Iposition给push到了markers的数组，导致用户的位置会和校车一样，15s后删除旧的图标然后add一个新的图标，这样就实现不了实时跟踪。高德的实时跟踪需要采用猎鹰SDK，但是这个SDK似乎只能用在Android和Ios上（）
- 当我从Homeview跳到Aboutview时，会报一个似乎并不会影响任何功能的错误，但是看着很不爽，后面再去看看怎么修改：<img width="500px" src="https://github.com/Mengbooo/PandaBus/assets/143786942/b007a277-6126-41de-838b-790ef6b54739">
- 好像没有了。因为司机会走魔幻路线，所以我把站数改为距离，感觉这更合理一点。然后删除了在站点线上的小车图标（小程序有个奇怪的bug，当你点击了小车即将要到的站点时，会导致除了地图外，页面上的所有部分全部失灵，也就是说小程序的那个到站提醒块没起到作用，只能显示小车已经走过的站的到站提醒，只不过清一色的“此站点附近没有校车”）
- 界面的颜色是不是需要调一下？
- Warning：有部分代码是边学vue时边敲出来的，依托狮山但能跑。
- 小程序用的是腾讯地图，这个用的是高德地图，应该没什么问题吧。







