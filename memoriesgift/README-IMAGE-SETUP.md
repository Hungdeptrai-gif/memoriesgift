# Adding Images to Your App - Method 2: Separate Preview Images

## 🎯 **Recommended Approach: Separate Preview Images**

This method uses small preview images stored in your `public/` folder.

## 📁 **Step 1: Create Preview Images**

1. **Resize your main images** to 256x256 pixels for previews
2. **Save them** in the `memoriesgift/public/` directory with these names:

```
memoriesgift/public/
├── happy-anniversary-preview.jpg
├── happy-valentines-day-preview.jpg
├── love-album-preview.jpg
├── happy-anniversary-music-preview.jpg
├── happy-birthday-preview.jpg
├── happy-graduation-preview.jpg
├── spotify-music-preview.jpg
└── happy-anniversary-3-pictures-preview.jpg
```

## 🔧 **Step 2: Update Your Code**

Replace the `preview` fields in `src/app/page.tsx`:

```javascript
const BACKGROUNDS = [
  { 
    name: 'Happy Anniversary', 
    image: '/city-bg.jpg', 
    preview: '/happy-anniversary-preview.jpg'  // ← Updated
  },
  { 
    name: 'Happy Valentine\'s Day', 
    image: '/happy-valentines-day.jpg', 
    preview: '/happy-valentines-day-preview.jpg'  // ← Updated
  },
  { 
    name: 'Love Album', 
    image: '/love-album.jpg', 
    preview: '/love-album-preview.jpg'  // ← Updated
  },
  { 
    name: 'Happy Anniversary Music', 
    image: '/happy-anniversary-music.jpg', 
    preview: '/happy-anniversary-music-preview.jpg'  // ← Updated
  },
  { 
    name: 'Happy Birthday', 
    image: '/happy-birthday.jpg', 
    preview: '/happy-birthday-preview.jpg'  // ← Updated
  },
  { 
    name: 'Happy Graduation', 
    image: '/happy-graduation.jpg', 
    preview: '/happy-graduation-preview.jpg'  // ← Updated
  },
  { 
    name: 'Spotify Music', 
    image: '/spotify-music.jpg', 
    preview: '/spotify-music-preview.jpg'  // ← Updated
  },
  { 
    name: 'Happy Anniversary (3 pictures)', 
    image: '/happy-anniversary-3-pictures.jpg', 
    preview: '/happy-anniversary-3-pictures-preview.jpg'  // ← Updated
  }
];
```

## 📐 **Image Specifications**

### Preview Images (256x256 pixels):
- **Format**: JPG (recommended) or PNG
- **Size**: 256x256 pixels
- **File size**: Keep under 50KB each
- **Quality**: Medium quality is sufficient

### Main Background Images:
- **Format**: JPG or PNG
- **Size**: 1920x1080 or similar aspect ratio
- **File size**: Keep under 2MB each
- **Quality**: High quality for best appearance

## 🛠️ **Tools to Resize Images**

1. **Online**: https://www.iloveimg.com/resize-image
2. **Windows**: Paint 3D or Photos app
3. **Mac**: Preview app
4. **Online**: https://pixlr.com/ (free Photoshop alternative)

## ✅ **Testing Your Changes**

1. **Save your preview images** in the `public/` folder
2. **Update the code** with the new preview paths
3. **Run the app**: `npm run dev`
4. **Test**: Go to step 2 (Background Design) and hover over each option
5. **Verify**: You should see your actual image previews instead of SVG placeholders

## 🎨 **Benefits of This Method**

- ✅ Easy to manage and update
- ✅ Fast loading (small preview files)
- ✅ Clear file organization
- ✅ Easy to replace individual previews
- ✅ No long base64 strings in code

## 📝 **Quick Checklist**

- [ ] Create 256x256 preview versions of your images
- [ ] Save them in `memoriesgift/public/` with `-preview.jpg` suffix
- [ ] Update all `preview` fields in the BACKGROUNDS array
- [ ] Test by hovering over background options
- [ ] Commit and push your changes

This method gives you the cleanest code and easiest maintenance! 🚀
