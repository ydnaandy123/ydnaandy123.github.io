|--Home
   |--Image
      |--Location: xinhu\src\home
      |--Update Method:  Replace images and keep the filenames same.
      |--Update Notifications: small image size is better.  (jpg is good enough in most case)
---------------------------------------------------------------------------
|--Galley
   |--Banner
      |--Location: xinhu/src/gallery.
      |--Dimensions: 1600x300.
      |--Update Method: Replace images and keep the filenames same.
   |--Category 
      |--Name Update: Contact me (kind of complicated).
      |--Color Update: xinhu/css/gallery.css | .classColorAll | background-color (Reference: xinhu\tutorial\gallery\Category_Color.png)
   |--Create a new Video
      |--Web Update: xinhu\javascript\gallery_videos.js (Reference: xinhu\tutorial\gallery\Video_Update.mp4)
      |--(Optional) Excel Update:  xinhu/youtubeVideos.xlsx
      |--(Optional) Excel to Web:  https://www.csvjson.com/csv2json (Refference: xinhu\tutorial\gallery\Excel_to_Web.mp4)
---------------------------------------------------------------------------
|--Medal
   |--Banner
      |--Location: xinhu/src/medal.
      |--Dimensions: 1600x300.
      |--Update Method: Replace images and keep the filenames same.
   |--Category 
      |--Name Update: Contact me (kind of complicated).
      |--Color Update: xinhu/css/medal.css | .classColorAll | background-color (Reference: xinhu\tutorial\medal\Category_Color.jpg)
   |--Create a new Medal
      |--Recommended procedure: 1. tag index -> 2. take a photo -> 3.  web update / excel update 
      |--Photo
         |-- Big (original)
             |--Location: xinhu\src\medalPhotos
             |--Dimension: 3024x4032
         |--Small (compressed)
             |--Location: xinhu\src\medalPhotosDownsize
             |--Dimension: 320x426
      |--Web Update:
            |-- xinhu\javascript\medal_data.js (Reference: xinhu\tutorial\medal\Medal_Update.mp4)
      |--(Optional) Excel Update:  xinhu/medals.xlsx
      |--(Optional) Excel to Web:  https://www.csvjson.com/csv2json (Refference: xinhu\tutorial\medal\Excel_to_Web.mp4)
