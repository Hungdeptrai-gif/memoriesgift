# Update Remaining Preview Paths

## Current Status
✅ Updated: 5 out of 8 backgrounds
❌ Remaining: 3 backgrounds still need updating

## Manual Updates Needed

You need to manually update these 3 remaining backgrounds in `src/app/page.tsx`:

### 1. Happy Graduation (Line ~61)
**Change from:**
```javascript
preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjMyIiB5PSIzMiIgd2lkdGg9IjE5MiIgaGVpZ2h0PSIxOTIiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxyZWN0IHg9IjQ4IiB5PSI0OCIgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjQ0NDQ0NDIi8+CjxyZWN0IHg9IjE2MCIgeT0iNDgiIHdpZHRoPSI0OCIgZmlsbD0iIjQ4IiBmaWxsPSIjQ0NDQ0NDIi8+CjxyZWN0IHg9IjQ4IiB5PSIxMTIiIHdpZHRoPSIxNjAiIGhlaWdodD0iMTI4IiBmaWxsPSIjQ0NDQ0NDIi8+Cjwvc3ZnPg=='
```

**Change to:**
```javascript
preview: '/happy-graduation-preview.jpg'
```

### 2. Spotify Music (Line ~65)
**Change from:**
```javascript
preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjODlDQ0ZGIi8+CjxwYXRoIGQ9Ik0xMjgsMzJMMjI0LDEyOEgxOTJWMjI0SDE2NFYxMjhIMTI4WiIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB4PSI0OCIgeT0iMTI4IHdpZHRoPSIxNjAiIGhlaWdodD0iOTYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxjaXJjbGUgY3g9IjE2MCIgY3k9IjE3NiIgcj0iOCIgZmlsbD0iIzAwMDAwMCIvPgo8L3N2Zz4='
```

**Change to:**
```javascript
preview: '/spotify-music-preview.jpg'
```

### 3. Happy Anniversary (3 pictures) (Line ~69)
**Change from:**
```javascript
preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjMjI4QjIyIi8+CjxjaXJjbGUgY3g9IjY0IiBjeT0iNjQiIHI9IjIwIiBmaWxsPSIjMDA4MDAwIi8+CjxjaXJjbGUgY3g9IjE5MiIgY3k9IjY0IiByPSIyMCIgZmlsbD0iIzAwODAwMCIvPgo8Y2lyY2xlIGN4PSIxMjgiIGN5PSI5NiIgcj0iMjAiIGZpbGw9IiMwMDgwMDAiLz4KPHJlY3QgeD0iMCIgeT0iMTYwIHdpZHRoPSIyNTYiIGhlaWdodD0iOTYiIGZpbGw9IiM2NjQ0MDAiLz4KPGNpcmNsZSBjeD0iMTI4IiBjeT0iMjA4IiByPSIxNiIgZmlsbD0iIzAwODAwMCIvPgo8L3N2Zz4='
```

**Change to:**
```javascript
preview: '/happy-anniversary-3-pictures-preview.jpg'
```

## Next Steps

1. **Update the 3 remaining preview paths** in `src/app/page.tsx`
2. **Create your preview images** (256x256 pixels) and save them in `public/` folder
3. **Test the app** by running `npm run dev`
4. **Commit and push** your changes

## File Structure After Updates
```
memoriesgift/public/
├── happy-anniversary-preview.jpg ✅
├── happy-valentines-day-preview.jpg ✅
├── love-album-preview.jpg ✅
├── happy-anniversary-music-preview.jpg ✅
├── happy-birthday-preview.jpg ✅
├── happy-graduation-preview.jpg ❌ (need to create)
├── spotify-music-preview.jpg ❌ (need to create)
└── happy-anniversary-3-pictures-preview.jpg ❌ (need to create)
```

