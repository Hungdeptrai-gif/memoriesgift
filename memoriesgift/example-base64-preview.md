# Example: Adding Real Image Preview

## Current Code (SVG Preview)
```javascript
{
  name: 'Happy Anniversary', 
  image: '/city-bg.jpg', 
  preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjMzMzMzMzIi8+CjxyZWN0IHg9IjQwIiB5PSIxNjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI5NiIgZmlsbD0iIzY2NjY2NiIvPgo8cmVjdCB4PSI5MCIgeT0iMTQwIiB3aWR0aD0iNDAiIGhlaWdodD0iMTE2IiBmaWxsPSIjNjY2NjY2Ii8+CjxyZWN0IHg9IjE0MCIgeT0iMTgwIiB3aWR0aD0iNDAiIGhlaWdodD0iNzYiIGZpbGw9IiM2NjY2NjYiLz4KPHJlY3QgeD0iMTkwIiB5PSIxNjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI5NiIgZmlsbD0iIzY2NjY2NiIvPgo8Y2lyY2xlIGN4PSIxMjgiIGN5PSI4MCIgcj0iMjAiIGZpbGw9IiM5OTk5OTkiLz4KPC9zdmc+'
}
```

## Updated Code (Real Image Preview)
```javascript
{
  name: 'Happy Anniversary', 
  image: '/city-bg.jpg', 
  preview: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=' // Your real image here
}
```

## Steps to Convert Your Image:

1. **Go to**: https://www.base64-image.de/
2. **Upload your image** (make it small, like 256x256 pixels)
3. **Copy the base64 string** that appears
4. **Replace the preview field** in your code

## Alternative: Use Direct Image Path
```javascript
{
  name: 'Happy Anniversary', 
  image: '/city-bg.jpg', 
  preview: '/happy-anniversary-preview.jpg' // Direct path to small preview image
}
```

## Tips:
- Keep preview images small (256x256 pixels max)
- Use JPG format for smaller file sizes
- Test the preview by hovering over the background options in your app

